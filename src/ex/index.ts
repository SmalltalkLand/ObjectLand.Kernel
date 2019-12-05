export default class Ex{
    private _chrome: any;
    private _ui: Function;
    private opts: any;
constructor(chrome: any,ui: Function,opts: any){this._chrome = chrome; this._ui = ui; this.opts = opts}
async onSqueakLinked(sproxy: any): Promise<any>{
    var chrome = this._chrome;
await sproxy.call('when:send:to:','jsCMessage','call:with:',async function(evt: any): Promise<any>{
    var d = await evt.call('data');
var reply = await new Promise(c => chrome.runtime.postMessage(d,c));
return await evt.call('reply:',reply);
})

}
}