import * as  _ from 'lodash-es'
import { createStore } from 'redux'

import Ex from './ex'
import execProg from './exec-program'
import UI from './ui'
import _squeak from './squeak-default'
import Link from './link/main'
import sw_main from'./worker/main'
import argv from './argv-handler'
import gg_init from './gadgets/framework'
import scratchPrimLoader from './squeak-prims/scratch'
import serialPrimLoader from './squeak-prims/serial'
import Console from './console'
import AppManager from './app-manager'
import Sheet from './sheet-base'
import sn_init from './sn-init'
let win = (window || self || global) as any;
let uiWin;
win.isSugar = false;
let enq: (obj: any) => any = undefined;
let currentAppt: any, currentApp : any;
let allAppst: Array<any> = [], allApps: Array<any> = [];
let c = Console((e: any) => enq = e,() => currentAppt);
let tam = new AppManager(allAppst,{getCurrent: () => currentAppt,setCurrent: (v) => {currentAppt = v}});
let am = new AppManager(allApps,{getCurrent: () => currentApp,setCurrent: (v) => {currentApp = v}});
let theStore = createStore((old,action: any) => {if(action.type === '_changeData')return action.data;return old},{memeOkBoomer: false,memeFlatEarth: false});
let link: Link = new Link(UI,{onFlagScratchClicked: (l: Link,evt: any) => {
    
    let titles = win.document.getElementsByClassName('project-title');
    let pangeaDetected = [].filter.call(titles,(t: { innerHTML: string }) => t.innerHTML.includes('Pangea'));
    if(pangeaDetected.length){
pangeaDetected.forEach((p: HTMLElement) => p.addEventListener('click',(nevt: any) => {let snap = window.open('https://snap.berkeley.edu/embed?project=Pangea%20OS%20NT&user=gkgoat&showTitle=true&showAuthor=true&editButton=true&pauseButton=true');
sn_init(snap,win,enq,allApps);
}));

    };

}});
let activity: any, name, pallette: any;
win._$console = c;
win._$allApps = allApps;
win.Sheet = Sheet.bind(undefined,enq);
win.addEventListener('message',(mevt: any) => {
if(mevt.data.type === 'createConsole'){let channel = new MessageChannel(); mevt.source.postMessage({port: channel.port2},'*',[channel.port2]); allApps.push(new WritableStream({write: channel.port2.postMessage.bind(channel.port2)}));channel.port1.addEventListener('message',evt => enq(evt.data))};
if(mevt.data.type === 'linkConsole'){mevt.data.port.addEventListener('message',(c[1] as any).write.bind(c[1])); let t: Array<any>; (t = (c[0] as ReadableStream).tee())[0].pipeTo(new WritableStream({write: mevt.data.port.postMessage.bind(mevt.data.port)})).then(() => {c[0] = t[1]})};
});
win.console.log = ((old) => (text: any) => {enq(text); return old(text)})(win.console.log);
win.prompt = ((old) => (text: string) => {return old(text)})(win.prompt);
let chrome = win.chrome;
let embeddedWin;
if(chrome && chrome.app && chrome.app.window !== undefined)chrome.app.window.create('/dist/embed.html#/main.js',{},(win2: any) => {embeddedWin = win2;win2.contentWindow.addEventListener('message',(m: any) => win.postMessage(m.data,'*',m.data.transferables)); win.addEventListener('message',(m: any) => {if(m.data.type == 'comToMainWindow')win2.postMesage(m.data.data,'*',m.data.transferables)})});
let kapi = (win.olKAPI || (win.olKAPI = {}));
kapi.addUI = (ui: any) => {UI.Current = new UI(ui)};
let useSqueak = true;
let workerMap: Map<any,Worker> = new Map();
let libs: Map<string,any> = new Map();
let theSenderForGadgets: Function | undefined;
let argvGlobalMap: Map<any,Array<any>> = new Map();
let svm: any, ex: Ex | undefined, svevt: any, server: any, initRequest: Request | undefined, services: Array<any> | undefined;
let s_canvas: any = new OffscreenCanvas(1000,1000);
if(win.workerMap){
    workerMap = win.workerMap;
    useSqueak = false;
    delete win.workerMap;
    win.addEventListener('message',(evt: MessageEvent) => {if(evt.data.workerID && evt.data.create){let w;win.ol_w_set(evt.data.workerID,w = new Worker(evt.data.url));return;};if(evt.data.workerID)workerMap.get(evt.data.workerID).postMessage(Object.assign({},evt.data.data,{transferables: evt.data.transferables}),evt.data.transferrables)})
    win.ol_w_set = function(k: any,v: Worker){workerMap.set(k,v); v.addEventListener('message',(evt: any) => {win.postMessage({responseID: k,data: evt.data,transferables: evt.data.transferables},'*',evt.data.transferables)})}
};
if(win.define || (win.System && win.System.amdDefine)){
    let define = win.define || (win.System && win.System.amdDefine);
    define("activity/activity", ["sugar-web/activity/activity", "sugar-web/env","olPalette"],(basicActivity: any,env: any,olPalette: any) => {win.isSugar = true;if(win.rollyChain)win.rollyChain.forEach((v: any) => v.setIsSugar(true));activity = basicActivity; env.getEnvironment((err: any,result: any) => {name = result.user.name; win.addEventListener('DOMContentLoaded',(e: any) => {activity.start(); pallette = new olPalette.OLPallette(document.getElementById('olPalleteBarItem'),'ObjectLand'); })})});
define('ol.bridge',['exports'],(exports: any) => {
    Object.defineProperty(exports,'enq',{get: () => enq});
    Object.defineProperty(exports,'pallette',{get: () => pallette});

});
};
if(chrome)ex = new Ex(chrome,UI,{getSqueakProxy: () => svevt && svevt.sProxy,getLink: () => link});
if(!chrome && win.document){gg_init({win, workerMap, libs, chrome: undefined,callback: (send: Function) => {theSenderForGadgets = send}}); useSqueak = useSqueak && (win.isGadgetHelper)};
if((win as any).ServiceWorkerWare)server = new (win as any).ServiceWorkerWare();
if(win.require && !server)try{server = win.require('express')()}catch(err){};
if(win.document)link.listen(document.body);
if(win.location && (win.location.hostname.includes('ol') || win.location.protocol === 'chrome-extension'))useSqueak = true;
sw_main(win,server).then(request => {if(request)initRequest = request});
if(ex)ex.initServices().then(servicesFromEx => {services = servicesFromEx});
win.addEventListener('message',(evt: any) => {
    if(evt.data.type === 'exlinkgadget')theSenderForGadgets(Object.assign({},evt.data.data,{transferables: evt.data.transferables}),evt.data.transferables)
if(chrome && evt.data.id && evt.data.data && evt.data.type === 'chrome')chrome.runtime.postMessage(Object.assign({},evt.data.data,{isFromWebpage: true,id: evt.data.id}),(message: any) => {win.postMessage({chromeResponseID: evt.data.id,chromeResponseData: message})});
if(theSenderForGadgets && evt.data.type === 'gadget')theSenderForGadgets(evt.data.data,evt.data.transferables);
});

//setup ui
function getChromeDeskEnvURL(): Promise<any>{
return new Promise((c, e) => {
    if(!chrome)return e();
chrome.storage.sync.get(['ol-deskEnv'],(v: { [x: string]: any; }) => {
e(v['ol-deskEnv'])

})

})

}
if(win.open){uiWin = getChromeDeskEnvURL().catch(err => err || Promise.resolve((win.prompt.default || win.prompt).call(win,'Desk Env URL'))).then(v=> win.open(v)).then(w => {win.addEventListener('message',(evt: any) => {if(evt.source === w){win.postMessage(evt.data,'*',evt.data.transferables)};if(evt.data.type === 'comToDeskEnv')w.postMessage({type: 'fromWin',data: evt.data},'*',evt.data.transferables)}); return w})}