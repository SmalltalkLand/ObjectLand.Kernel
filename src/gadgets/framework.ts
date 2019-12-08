import port_embed_listener from './port_embed_listener'
function sendToGadget(evt: MessageEvent,id: string,data: any){
    evt.data.port.postMessage({postToWindow: {workerID: id,data: data}});

}
export default function gg_init({ win, workerMap, libs, chrome }: { win: any; workerMap: Map<any, Worker>; libs: Map<string, any>; chrome: any; }): any{
if(win.inGadgetHelper){
    let wmap: any = new Map();
    win.addEventListener('message',(evt: MessageEvent) => {
if(evt.data.type === 'init'){
    let r_sendToGadget = sendToGadget.bind(undefined,evt);
    evt.data.port.addEventListener('message',(mevt: MessageEvent) => {
if(mevt.data.type === 'addGadget'){
    let uuid = new Array(10).map(el => String.fromCharCode((Math.random() * 128) + 20)).reduce((a,b) => a ? a + b : b); 
    evt.data.port.postMessage({postToWindow: {workerID: uuid,create: true,url: mevt.data.data}});
    let canvas = new OffscreenCanvas(400,400);
    let port = new MessageChannel();
    port_embed_listener(win,port.port1,uuid,evt.data.port);
    evt.data.port.postMessage({postToWindow: {workerID: uuid,data: {canvas: canvas,port: port.port2},transferables: [canvas,port.port2]},postToWindow_transferables: [canvas,port.port2]})
}

})};

    })
}else{
    let helperPort = new MessageChannel();
    win.postMessage({workerID: 'GadgetHelper',data: {type: 'init',port: helperPort.port2},transferrables: [helperPort.port2]},'*',[helperPort.port2])
helperPort.port1.addEventListener('message',(evt: MessageEvent) => {
if(evt.data.postToWindow)win.postMessage(Object.assign({},evt.data.postToWindow,{transferables: evt.data.postToWindow_transferables}),'*',evt.data.postToWindow_transferrables || [])

})
win.addEventListener('message',(evt: MessageEvent) => {
helperPort.port1.postMessage({messageFromWindow: evt.data},evt.data.transferables)

})
}
}