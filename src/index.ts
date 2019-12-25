import './css/main.css'

import * as  _ from 'lodash-es'
import WebMidi from 'webmidi';
import $ from 'cash-dom'
import { Terminal } from 'xterm';
import "morphic-gui/dist/morphic";
import { createStore, combineReducers } from 'redux'
import scopedReducer from 'reduxr-scoped-reducer';
import reduceReducers from 'reduce-reducers'

import * as vort from './vort'

import './fill'

import {pipe} from './pipe-funcs'

import MainWorker from './worker/main.shared-worker.js'

import Ex from './ex'
import BaseWindow from './base-window'
import OlBridgeMorph from './ol-bridge-morph'
import MJSWindow from './mjsWin'
import appRedux from './app-redux-handler'
import createAuthID from './auth-id-maker'
import squeakReducer from './squeakReducer'
import rintegration from './rIntegration'
import execProg from './exec-program'
import UI from './ui'
import _squeak from './squeak-default'
import Link from './link/main'
import argv from './argv-handler'
import gg_init from './gadgets/framework'
import scratchPrimLoader from './squeak-prims/scratch'
import serialPrimLoader from './squeak-prims/serial'
import Console from './console'
import AppManager from './app-manager'
import Sheet from './sheet-base'
import sn_init from './sn-init'
import id from './util/id'
import initTerm from './initTerm';

declare var kernel: any;
declare var IDE_Morph: any;
declare var sq_module: any;
let c: any;
let theWorker = new (MainWorker as any)();
let OTerminal = pipe(v => new Terminal(v),_.partial(initTerm,theWorker));
let sendp = (evt: any) => new Promise(c => {let id_:any;theWorker.postMessage({...evt,id: id_ = id()}); window.addEventListener('message',function a(evt: { data: { id: any; }; }){if(evt.data.id === id_){window.removeEventListener('message',a); return c()}})});
let win = (window || self || global) as any;
let script = (name: string) => new Promise((c,e) => {var script = document.createElement('script');
script.onload =c;
script.onerror = e;
script.src = name;

document.head.appendChild(script);});
$('#brave, .window-boot, #sn_world').each(function(){BaseWindow(this,{decoration: (elem: any) => {},title: $(this).find('.title').appendTo($('body')).get(0)})});
script('../../Snap/src/symbols.js').then(_.partial(script,'../../Snap/src/blocks.js')).then(_.partial(script,'../../Snap/src/threads.js')).then(_.partial(script,'../../Snap/src/objects.js')).then(_.partial(script,'../../Snap/src/cloud.js')).then(_.partial(script,'../../Snap/src/lists.js')).then(_.partial(script,'../../Snap/src/byob.js')).then(_.partial(script,'../../Snap/src/sketch.js')).then(_.partial(script,'../../Snap/src/video.js')).then(_.partial(script,'../../Snap/src/maps.js')).then(_.partial(script,'../../Snap/src/xml.js')).then(_.partial(script,'../../Snap/src/store.js')).then(_.partial(script,'../../Snap/src/locale.js')).then(_.partial(script,'../../Snap/src/api.js')).then(_.partial(script,'../../Snap/src/FileSaver.min.js')).then(() => {
let world: any;
document.addEventListener('load',function () {
    world = new WorldMorph(document.getElementById('sn_world'));
    new IDE_Morph(false,kernel).openIn(world);
    loop();
});
function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}

}).catch(err => {});
script('../../ObjectLand.SqueakJS/squeak.js').then(() => new Promise(c => sq_module('ObjectLand').requires('SqueakJS').toRun(c))).then(() => {return win.SqueakJS}).then(sjs => _squeak(sjs,{stdin: c[1],stdout: c[0]},{win,kapi,s_canvas,argv,serialPrimLoader,scratchPrimLoader,initRequest,chrome,argvGlobalMap,services,ex})).catch(err => {});
win.addEventListener('message',(evt: any) => {if(evt.type === 'installAppTemp')sendp({type: 'installAppTemp',data: evt.data})});
let MIDIinputs, MIDIoutputs: any;
WebMidi.enable(err => {if(!err){MIDIinputs = WebMidi.inputs;MIDIoutputs = WebMidi.outputs; if(MIDIinputs[0])MIDIinputs[0].addListener('noteoff','all',pipe(n => ({type: 'midi',data: n}),sendp,p => p.then((r: any) => r.data[0] && MIDIoutputs[0].playNote(...(r.data as Array<any>)))))}})
let handlers: any = {};
win.addEventListener = win.addEventListener || ((type: any,callback: any) => {(handlers[type] || (handlers[type] = [])).push(callback)});
win.removeEventListener = win.removeEventListener || ((type: any,callback: any) => {handlers[type] = handlers[type] && handlers[type].filter((v: any) => v !== callback)});
win.kernel = {};
kernel.theWorker = theWorker;
kernel.OMainTerminal = OTerminal;
kernel.OTerminal = Terminal;
kernel.snap = (s: any,c: Function) => {s.$ = pipe($,_.partialRight($.fn.filter.call.bind($.fn.filter),'.sn_sandboxed')); c()};
kernel.onRanVM = (vm: any,c: Function) => {Object.defineProperty(vm.image.specialObjectsArray,'vm',{get: () => vm})};
kernel.vort = vort;
kernel.BaseWindow = BaseWindow;
kernel.auth = (password: string) => new Promise((c,e) => {kernel.store.getState().sys.usr.filter((u: { token: any; }) => u.token === password || u.token.OLCacheEndpointPassword === password).forEach(c); e()});
kernel.prefs = (u: any) => new Promise(c => {fetch(u.domain || ('ol.co/' + u.name)).then(r => r.json()).then(c)});
win.OlBridgeMorph = OlBridgeMorph;

let uiWin;
win.isSugar = false;
let enq: (obj: any) => any = undefined;
let allAppst: Array<any> = [], allApps: Array<any> = [];
let reducer: any;
let theStore = kernel.store = createStore(reducer = kernel.reducer = reduceReducers(
    {sys: {k: {},app: undefined,terminal: undefined,memeOkBoomer: false,memeFlatEarth: false}} as any,
    combineReducers({
        sys: reduceReducers(null,
            combineReducers({
                k: reduceReducers(null,(s,a) => s),
                usr: scopedReducer('usr_',(s: any,a: any) => {if(a.type === 'user-create')return Object.assign({},s,{users: s.users.concat([a.data])});if(a.type === 'user_remove')return Object.assign({},s,{users: s.users.filter((u: any) => u.name === a.data.name && u.passToken === a.data.token)});return s})

            })
            )

    }),
    combineReducers({
        dt: reduceReducers({toolSlices: []}),
        st: scopedReducer('squeak_',_.partial(squeakReducer,() => win.SqueakJS)),
        rolly: combineReducers({
            rIntegration: scopedReducer('r-integration_',_.partialRight(_.partial(rintegration,win),combineReducers({}))),
            rData: scopedReducer('r-data_',(state: any = {},action: any) => {if(action.type === 'addLocalComponent')return Object.assign({},state,{[action.id]: action.data});if(action.type === 'setComponentID')return Object.assign({},state,{id: action.data});return state})
        }),
        sysExtras: scopedReducer('extras_',combineReducers({})),
        app: _.partial(appRedux,win),
        sys: (old,action: any) => {if(action.type === 'setApp')return {app: action.data};if(action.type === 'setTApp')return {terminal: action.data};if(action.type === '_changeData')return action.data;return old}
    }),
    scopedReducer('dt_',_.partial((slicer: any,mstate: any,action: any) => mstate.dt.toolSlices.reduce((state: any, slice: string) => Object.assign({},state,{[slice]: Object.assign({},state[slice],slicer(state[slice],action))}),mstate),
    (slice: any,action: any) => {return slice})),
    combineReducers({
        auth: scopedReducer('auth_',(state: any,action: any) => {if(action.type === 'createID')return Object.assign({},state,{id: action.data || createAuthID()});return state}),
    })
));
win.addEventListener('message',(m: any) => {theStore.dispatch({...m.data,source: m.source,origin: m.origin})})
c = Console((e: any) => enq = e,() => theStore.getState().sys.terminal);
let tam = new AppManager(allAppst,{getCurrent: () => theStore.getState().sys.terminal,setCurrent: (v) => {theStore.dispatch({type: 'setTApp',data: v})}});
let am = new AppManager(allApps,{getCurrent: () => theStore.getState().sys.app,setCurrent: (v) => {theStore.dispatch({type: 'setApp',data: v})}});
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