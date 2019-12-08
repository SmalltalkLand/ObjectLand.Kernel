import Ex from './ex'
import UI from './ui'
import runSqueak from './squeak'
import Link from './link/main'
import sw_main from'./worker/main'
import argv from './argv-handler'
import gg_init from './gadgets/framework'
let win = (window || self || global) as any;
let chrome = win.chrome;
let kapi = (win.olKAPI || (win.olKAPI = {}));
kapi.addUI = (ui: any) => {UI.Current = new UI(ui)};
let useSqueak = true;
let workerMap: Map<any,Worker> = new Map();
let libs: Map<string,any> = new Map();
let argvGlobalMap: Map<any,Array<any>> = new Map();
let svm: any, ex: Ex | undefined, svevt: any, link: Link = new Link(UI), server: any, initRequest: Request | undefined, services: Array<any> | undefined;
let s_canvas: any = new OffscreenCanvas(1000,1000);
if(win.workerMap){
    workerMap = win.workerMap;
    useSqueak = false;
    delete win.workerMap;
    win.addEventListener('message',(evt: MessageEvent) => {if(evt.data.workerID && evt.data.create){let w;win.ol_w_set(evt.data.workerID,w = new Worker(evt.data.url));return;};if(evt.data.workerID)workerMap.get(evt.data.workerID).postMessage(Object.assign({},evt.data.data,{transferables: evt.data.transferables}),evt.data.transferrables)})
    win.ol_w_set = function(k: any,v: Worker){workerMap.set(k,v); v.addEventListener('message',(evt: any) => {win.postMessage({responseID: k,data: evt.data,transferables: evt.data.transferables},'*',evt.data.transferables)})}
};
if(win.System){
win.System.amdDefine('ol.bridge',[],() => {
return {


}

});

}
if(chrome)ex = new Ex(chrome,UI,{getSqueakProxy: () => svevt && svevt.sProxy,getLink: () => link});
if(!chrome && win.document)gg_init({win, workerMap, libs, chrome: undefined})
if((win as any).ServiceWorkerWare)server = new (win as any).ServiceWorkerWare();
if(win.require && !server)try{server = win.require('express')()}catch(err){};
if(win.document)link.listen(document.body);
if(useSqueak)runSqueak({url: win.location.protocol + '//' + win.location.hostname + '/squeak/squeak.image',component: {element: {getContext(t: string){
    if(win.document && UI.Current)return (UI.Current.getFramework().$rootComponent as any).SqueakDisplay.element.getContext(t);
    if(kapi.getSqueakContext)return kapi.getSqueakContext(t);
    return s_canvas.getContext(t)
}}}}).then(vm => {if(kapi.onSqueakLinked)return kapi.onSqueakLinked(vm).then((_v: any) => vm); return vm}).then(vm => {argv(vm.primHandler.display,argvGlobalMap);let JSClass: any;vm.builtinModules.ObjectLandKernelWebPlugin = {
    getBody(argCount: number){vm.pop(); vm.push(vm.primHandler.makeStObject(initRequest && initRequest.body,JSClass))},
    setJSClass(argCount: number){vm.push(JSClass = vm.pop())},
    addPrimitive(argCount: number){let popped = vm.pop(), jsObject = popped.jsObject; if(!jsObject){vm.push(popped); jsObject = vm};let moduleName; (jsObject.primHandler.loadedModules[moduleName = vm.primHandler.js_fromStObject(vm.pop())] || (jsObject.primHandler.loadedModules[moduleName] = {}))[vm.primHandler.js_fromStObject(vm.pop())] = ((f: Function) => (argCount: number) => {
let unfreeze: Function = jsObject.freeze();
f(jsObject).then(unfreeze)

    })(vm.ol_fromStBlock(vm.pop())); vm.push(vm.pop())},
    addProperty(argCount: number){
        let index = vm.pop(),
        theGet = vm.primHandler.js_fromStObject(vm.pop(),JSClass),
        theSet = vm.primHandler.js_fromStObject(vm.pop(),JSClass), 
        p, cachedValue: any;
        
        Object.defineProperty((p = vm.pop()).pointers || p.bytes || p.words,index,{get: () => {theGet().then((v: any) => cachedValue = v);return cachedValue},set: (v: any) => {theSet(v)}}) 
    },
    runVM(argCount: number){let theArgs = new Array(argCount).map(vm.pop.bind(vm)); vm.pop(); let unfreeze: Function = vm.freeze(); runSqueak(vm.fromStObject(theArgs[0])).then(nvm => {unfreeze(); vm.push(vm.primHandler.makeStObject(nvm,JSClass))})},
    sendChromeMessage(argCount: number){let message = vm.pop().jsObject; if(chrome){let unfreeze: Function = vm.freeze(); chrome.runtime.postMessage(message,(result: any) => {vm.push(result); unfreeze()})}},
    get getServices(){if(!services)return (argCount: number) => {}; return (argCount: number) => {vm.pop(); vm.push(vm.push(vm.primHandler.makeStObject(services,JSClass)))}},
    get kapiPrimitive(){return kapi.primitive.bind(kapi,vm)},
}; vm.on('load',(evt: any) => {svm = vm;svevt = evt;if(ex)ex.onSqueakLinked(svevt.sProxy)})});
sw_main(win,server).then(request => {if(request)initRequest = request});
if(ex)ex.initServices().then(servicesFromEx => {services = servicesFromEx}) 