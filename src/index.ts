import * as _ from 'lodash-es'

import Ex from './ex'
import UI from './ui'
import runSqueak from './squeak'
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
win.isSugar = false;
let enq: (obj: any) => any = undefined;
let currentApp: any;
let allApps: Array<any> = [];
let c = Console((e: any) => enq = e,() => currentApp);
let am = new AppManager(allApps,{getCurrent: () => currentApp,setCurrent: (v) => {currentApp = v}});
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
var squeak = _.once(_.partial(runSqueak,({url: win.location.protocol + '//' + win.location.hostname + '/squeak/squeak.image',component: {element: {getContext(t: string){
    if(win.document && UI.Current)return (UI.Current.getFramework().$rootComponent as any).SqueakDisplay.element.getContext(t);
    if(kapi.getSqueakContext)return kapi.getSqueakContext(t);
    return s_canvas.getContext(t)
}}},
then: (vm: any) => {Promise.resolve(vm).then(vm => {win.onRollyAdded = ((old: Function | undefined) => (rolly: any) => {rolly.initSqueak(vm); return old(rolly)})(win.onRollyAdded); return vm}).then(vm => {if(kapi.onSqueakLinked)return kapi.onSqueakLinked(vm).then((_v: any) => vm); return vm}).then(vm => {argv(vm.primHandler.display,argvGlobalMap);vm.titleMap = new Map(); scratchPrimLoader(vm,win);serialPrimLoader(vm);let JSClass: any;vm.builtinModules.ObjectLandKernelWebPlugin = {
    getBody(argCount: number){vm.pop(); vm.push(vm.primHandler.makeStObject(initRequest && initRequest.body,JSClass)); return true},
    setJSClass(argCount: number){vm.push(JSClass = vm.pop()); return true},
    addPrimitive(argCount: number){
        let popped = vm.pop(), jsObject = popped.jsObject;
         if(!jsObject){vm.push(popped); jsObject = vm};
         let moduleName; 
         (jsObject.primHandler.loadedModules[moduleName = vm.primHandler.js_fromStObject(vm.pop())] || jsObject.primHandler.builtinModules[moduleName]|| (jsObject.primHandler.loadedModules[moduleName] = {}))[vm.primHandler.js_fromStObject(vm.pop())] = ((f: Function) => (argCount: number) => {
let unfreeze: Function = jsObject.freeze();
f(jsObject).then(unfreeze);
return true

    })(vm.js_fromStBlock(vm.pop())); vm.push(vm.pop()); return true},
    addProperty(argCount: number){
        let index = vm.pop() - 1,
        theGet = vm.primHandler.js_fromStObject(vm.pop(),JSClass),
        theSet = vm.primHandler.js_fromStObject(vm.pop(),JSClass), 
        p, cachedValue: any;
        
        Object.defineProperty((p = vm.pop()).pointers || p.bytes || p.words,index === -1 ? 'sqClass': index,{get: () => {theGet().then((v: any) => cachedValue = v);return cachedValue},set: (v: any) => {theSet(v)}}) 
    },
    onMessage(argCount: number){window.addEventListener('message',vm.primHandler.js_fromStObject(vm.pop(),JSClass).bind(window,window.postMessage.bind(window))); vm.push(true); return true},
    runVM(argCount: number){let theArgs = new Array(1).map(vm.pop.bind(vm)); let unfreeze: Function = vm.freeze(); runSqueak(vm.fromStObject(theArgs[0])).then(nvm => {Object.defineProperty(nvm,'parent',{get: () => vm}); unfreeze(); serialPrimLoader(nvm); scratchPrimLoader(nvm,win); vm.push(vm.primHandler.makeStObject(nvm,JSClass))}); return true},
    sendChromeMessage(argCount: number){let message = vm.primHandler.js_fromStObject(vm.pop(),JSClass); if(chrome){let unfreeze: Function = vm.freeze(); chrome.runtime.postMessage(message,(result: any) => {vm.push(result); unfreeze()})}; return true},
    onChromeMessage(argCount: number){let messageHandler = vm.primHandler.js_fromStObject(vm.pop(),JSClass); if(chrome){chrome.runtime.onMessage.addListener(messageHandler)}; return true},
    get getServices(){if(!services)return (argCount: number) => {return false}; return (argCount: number) => {vm.pop(); vm.push(vm.push(vm.primHandler.makeStObject(services,JSClass))); return true}},
    get kapiPrimitive(){return kapi.primitive.bind(kapi,vm)},
}; vm.on('load',(evt: any) => {svm = vm;svevt = evt;if(ex)ex.onSqueakLinked(svevt.sProxy)})}).catch(console.log.bind(console));},

})));
sw_main(win,server).then(request => {if(request)initRequest = request});
if(ex)ex.initServices().then(servicesFromEx => {services = servicesFromEx});
win.addEventListener('message',(evt: any) => {
    if(evt.data.type === 'exlinkgadget')theSenderForGadgets(Object.assign({},evt.data.data,{transferables: evt.data.transferables}),evt.data.transferables)
if(chrome && evt.data.id && evt.data.data && evt.data.type === 'chrome')chrome.runtime.postMessage(Object.assign({},evt.data.data,{isFromWebpage: true,id: evt.data.id}),(message: any) => {win.postMessage({chromeResponseID: evt.data.id,chromeResponseData: message})});
if(theSenderForGadgets && evt.data.type === 'gadget')theSenderForGadgets(evt.data.data,evt.data.transferables);
});