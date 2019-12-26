import * as _ from 'lodash'
import $ from 'cash-dom'
import 'morphic-gui/dist/morphic.js'

import WorkerMain from './main.shared-worker.js'
import IDE_Morph from './IDE_Morph';

let win = (window || self || global) as any;
let w = new(WorkerMain as any)();
w.addEventListener('message',(evt: any) => {
    if(evt.data.type === 'load')script(evt.data.data).then(w.postMessage.bind(w,{type: 'sucess',id: evt.data.id}))
});
let script = (name: string) => new Promise((c,e) => {var script = document.createElement('script');
script.onload =c;
script.onerror = e;
script.src = name;

document.head.appendChild(script);});
let sn_script = (name: string) => script('../../Snap/src/' + name).catch(err => script('https://snap.berkeley.edu/snap/src/' + name));
let s_load = (name: string) => script('../../ObjectLand.SqueakJS/' + name).catch(err => script('squeak.js.org/' + name));
let blocks = sn_script('symbols.js').then(_.partial(sn_script,'blocks.js')).then(w.postMessage.bind(w,{type: 'loadedBlocks'})).then(() => win.SyntaxElementMorph);
let smalltalk = s_load('squeak.min.js').then(() => win.SqueakJS);
let snap = blocks.then((v: any) => sn_script('threads.js')).then(_.partial(sn_script,'objects.js')).then(_.partial(sn_script,'paint.js')).then(_.partial(sn_script,'lists.js')).then(_.partial(sn_script,'byob.js')).then(_.partial(sn_script,'tables.js')).then(_.partial(sn_script,'sketch.js')).then(_.partial(sn_script,'video.js')).then(_.partial(sn_script,'maps.js')).then(_.partial(sn_script,'xml.js')).then(_.partial(sn_script,'locale.js')).then(_.partial(sn_script,'sha512.js')).then(_.partial(sn_script,'FileSaver.min.js')).then(_.partial(IDE_Morph,w,win.Morph)).then(IDE_Morph_ => win.IDE_Morph = IDE_Morph_);
snap.then(_.partial(sn_script,'store.js'));