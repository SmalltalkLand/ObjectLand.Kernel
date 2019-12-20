
export default class Ex{
    private _chrome: any;
    private _ui: Function;
    private opts: any;
constructor(chrome: any,ui: Function,opts: any){this._chrome = chrome; this._ui = ui; this.opts = opts};
initServices(): Promise<Array<any>>{
return new Promise(c => {
this._chrome.storage.sync.get(['use'],(ur: any) => {
if(!ur.use)this._chrome.storage.sync.set({use: ur.use = []});
Promise.all(ur.use.map((uexid: any) => {
return new Promise(c => this._chrome.runtime.connect(uexid,c)).then(port => ({id: uexid,port: port}));

})).then(services => {c(services)});
})

});

}
async onSqueakLinked(sproxy: any): Promise<any>{
    var chrome = this._chrome;
await sproxy.call('when:send:to:','jsCMessage','call:with:',async function(evt: any): Promise<any>{
    var d = await evt.call('data');
var reply = await new Promise(c => chrome.runtime.postMessage(d,c));
return await evt.call('reply:',reply);
})

}
}