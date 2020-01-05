import * as _ from 'lodash'
import $ from 'cash-dom'
import Editor from './editor';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import * as Tone from "Tone";

import WorkerMain from './main.shared-worker.js';
import sandbox from './lib/sandbox.js';
import IDE_Morph from './IDE_Morph';
import attempt from './util/attempt';
import getIsBrave from './util/find-brave.js';
import WebSocketPlugin from './sqPlugins/ws';
import empowerWikipedia from './empower/wikipedia';
import exLink from './luurvely/ex-link';
import script from './script';
import scriptLocal from './scriptLocal';
import react from './React'


OfflinePluginRuntime.install();

let win = (window || self || global) as any;
let DialogWindow = class extends HTMLElement{
    static get observedAttributes() {
        return ['title'];
      }
      attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        switch (name) {
          case 'title':
            this.setTitle(newValue);
            break;
        }
      }
    dialog: any;title: any;constructor(){super(); this.attachShadow({mode: 'open'}); this.shadowRoot.innerHTML = `<div style = "position:absolute"><div id="titlebar" class = "titlebar">${this.title}</div>
	<button name="close"><!-- enter symbol here like &times; or &#x1f6c8; or use the default X if empty --></button>
    <div class="content" id = "content">
	</div>
	<div class="buttonpane">
		<div class="buttonset">
			<button name="ok">OK</button>
			<button name="cancel">Cancel</button>
		</div>
	</div></div>`;this.shadowRoot.getElementById('content').appendChild(document.createElement('slot'));this.dialog = new win.DialogBox(this.shadowRoot.firstChild,() => {});this.dialog.showDialog() }
    show(){this.style.display = 'block'}
    hide(){this.style.display = 'none'}
    setTitle(t: string){this.title = t; this.shadowRoot.getElementById('titlebar').innerText = t}

}
let smalltalk: Promise<any>;
let PharO = class extends HTMLCanvasElement{private vm: any;
    constructor(){super(); smalltalk.then(s => win.runSqueak).then(r => {r('Pharo7.1.4.image',this,{zip: ["memories/pharo7.zip", "sources/Pharo7.0-32bit-ccd1f64.sources.zip"]},(vm: any) => {this.vm = vm})})}
    getVM(){return this.vm}
};
let Morphic = class extends HTMLCanvasElement{ private world: any;constructor(){super(); this.world = new win.WorldMorph(this,false)}; getWorld(){return this.world}}
try{customElements.define('ol-dialog',DialogWindow);}catch(err){DialogWindow = customElements.get('ol-dialog')};
try{customElements.define('ol-morphic',Morphic);}catch(err){Morphic = customElements.get('ol-morphic')};
try{customElements.define('ol-pharO',PharO)}catch(err){PharO = customElements.get('ol-pharO')};
let rct: any;
react().then(c => {rct = c;return new Promise(c => rct.setState({worker: w},c))});
win.addEventListener('message',(evt: any) => {if(evt.data.type === 'windowify'){let d = new win.DialogBox(evt.data.shadow ? document.getElementById(evt.data.id).shadowRoot : document.getElementById(evt.data.id),() => {}); d.showDialog()}});
let chr_message = (m: any) => new Promise(c => {if(!win.chrome)throw new Error(); win.chrome.runtime.postMessage(m,c)});
let installApp: { (arg0: any): void; (evt: any): Promise<any>; };
win.kernel = {} as any;
(getIsBrave() ? $('#brave .title') : $('<span></span>')).text('Brave(Using)').parent()?.find('a')?.each(function(){let link = this; link.addEventListener('click',evt => evt.preventDefault())});
win.modules = {};
if(win.location.href.match(/^(.*)\.wikipedia\./)){empowerWikipedia(win.document.body,null)};
if(win.chrome)try{exLink();}catch(err){};
if(win.chrome){win.chrome.runtime.onMessage.addListener((m: { type: string; id: string; data: VirtualDOM.VPatch[]; },s: any,r: () => void) => {if(m.type === 'patch'){VirtualDOM.patch(document.getElementById(m.id),m.data); r()}})}
let w = new(WorkerMain as any)();
let cachedRolly: any;
let web3: any;
let ensureRolly = async () => {while(!win.rolly){await new Promise(c => requestAnimationFrame(c))}; if(cachedRolly !== win.rolly){await new Promise(c => win.rolly.setState({k_installApp: installApp,web3: web3.then.bind(web3)},c)); cachedRolly = win.rolly};return win.rolly};
w.addEventListener('message',(evt: any) => {
    if(win.rolly)ensureRolly().then(r => r.onMessage && r.omMessage(evt)).then(m => m && w.postMessage(m));
    if(evt.data.type === 'load')script(evt.data.data).then(attempt(() => w.port.postMessage.bind(w,{type: 'sucess',id: evt.data.id}),err => () => Promise.reject(err))())
});
installApp = (evt: any) => fetch(evt.data).then(r => r.text()).catch(err => evt.data).then(dat => w.postMessage({type: 'installApp',data: dat}));
win.addEventListener('message',(evt: any) => {
    if(evt.data.type && evt.data.type.startsWith('installApp'))installApp(evt.data);

})
let mainHTMLc;
let mainHTML = new Promise(c => mainHTMLc = c);
let olmenu = (evt: any) => {};
let quikis: Array<HTMLElement> = [];
let mh = (t: any,m: any) => {if(m.type === 'childList'){m.addedNodes.forEach((n: HTMLElement) => {if(n.id === 'qikipedia'){(quikis = quikis.filter(v => v !== n)).push(n)}})}};
let o = new MutationObserver((l,o) => {l.forEach(m => {let t = m.target; mh(t,m)})});
if(win.chrome)o.observe(document.body,{attributes: true,childList: true,subtree: true});
let ensureMorph = async () => {while(!win.Morph){await new Promise(c => requestAnimationFrame(c))}; return win.Morph};
let ensureLively = async ()=> {while(!win.lively){await new Promise(c => requestAnimationFrame(c))}; return win.lively};
let ensureSys = async () => {while(!win.System){await new Promise(c => requestAnimationFrame(c))}; return win.System};
let ensureWeb3 = async () => {while(!win.Web3){await new Promise(c => requestAnimationFrame(c))}; return win.Web3};
let sn_script = (name: string) => script('../../Snap/src/' + name).catch((err: any) => script('https://snap.berkeley.edu/snap/src/' + name));
let s_load = (name: string) => script('../../ObjectLand.SqueakJS/' + name).catch((err: any) => script('https://squeak.js.org/' + name));
web3 = ensureWeb3().then(Web3 =>  {return new Web3(Web3.givenProvider || (() => {throw new Error('No Web3')})())});
Promise.all([ensureLively(),ensureSys()]).then(a => ((l,s) => {return (new Promise(c => s.register('ol-startup',[],c))).then((_export: any) => {_export('ol',{postMessageToWorker: w.postMessage.bind(w),onMessageFromWorker: w.addEventListener.bind(w,'message'),web3: web3.then.bind(web3)})})})(...a));
ensureLively().then(l => win.kernel.lively = l);
let blocks = ensureMorph().then(_.partial(sn_script,'symbols.js')).then(_.partial(sn_script,'blocks.js')).then(w.port.postMessage.bind(w,{type: 'loadedBlocks'})).then(() => win.SyntaxElementMorph);
smalltalk = s_load('squeak.js').then(() => new Promise(c => ((win.module || win.sq_module || ((mn: any) => {throw new Error()})) as any)('OLSqueak').requires('SqueakJS').toRun(c))).then(() => win.SqueakJS).catch((err: any) => new Promise(c => {}));
smalltalk.then((s: any) => {win.Squeak.registerExternalModule('WebSocketPlugin',WebSocketPlugin())});
Promise.all([ensureRolly(),smalltalk]).then(a => ((r,s) => {let interpreter: any;win.Squeak.registerExternalModule('RollyPlugin',new Proxy({setInterpreter: (i: any) => {interpreter = i}} as any,{get: (o,k) => o[k] || r[k].bind(r,interpreter)}))})(...a))
smalltalk.then(() => {win.runSqueak = (vmName: string,canvas: any,opts: any,then: any) => {if(!(then instanceof Function) && win.invoke && win.List)then = (old => (vm: any) => {win.invoke(old,new win.List([vm]),undefined,10000,'Error',false,undefined,false)})(then);let prop = Object.getOwnPropertyDescriptor(win.SqueakJS,'vm');win.SqueakJS.runSqueak(vmName,canvas,Object.assign({},opts,{then: (vm: any) => {Object.defineProperty(win.SqueakJS,'vm',prop);then(vm)}})); Object.defineProperty(win.SqueakJS,'vm',{enumerable: true,configurable: true,get: () => {},set: (v) => {Object.defineProperty(win.SqueakJS,'vm',prop); then(v)}})}});
let rt = blocks.then((v: any) => sn_script('threads.js')).then(_.partial(sn_script,'objects.js')).then(_.partial(sn_script,'lists.js'));
Promise.all([rt,smalltalk]).then(a => {win.SpriteMorph.blocks = Object.assign({},win.SpriteMorph.blocks,{doCreateSqueak: {type: 'reporter',category: 'variables',spec: 'run squeak %s canvas %s then %s'}}); win.Process.prototype.doCreateSqueak = win.runSqueak})
let snap = rt.then(_.partial(sn_script,'paint.js')).then(_.partial(sn_script,'byob.js')).then(_.partial(sn_script,'tables.js')).then(_.partial(sn_script,'sketch.js')).then(_.partial(sn_script,'video.js')).then(_.partial(sn_script,'maps.js')).then(_.partial(sn_script,'xml.js')).then(_.partial(sn_script,'locale.js')).then(_.partial(sn_script,'sha512.js')).then(_.partial(sn_script,'FileSaver.min.js')).then(_.partial(IDE_Morph,w,win.Morph)).then(IDE_Morph_ => win.IDE_Morph = IDE_Morph_);
snap.then(_.partial(sn_script,'store.js'));
export function vc_activate(vscode: any,ctxt: any){
    function requireWithFallback(electronModule: string, nodeModule: string) {
        try {
          return require(electronModule);
        } catch (err) {}
        return require(nodeModule);
      }
let fs = requireWithFallback('original-fs','fs'); 
let p = vscode.window.createWebviewPanel(
    'ol',
    'ObjectLand',
    vscode.ViewColumn.One,
    {
        enableScripts: true

    }
);
p.webview.postMessage({type: 'ol-init',data: {}});
function onMessage(p: any,f: (m: any) => void){
    p.webview.onDidReceiveMessage(
        f,
        undefined,
        ctxt.subscriptions
      );

};
onMessage(p,m => {});
}