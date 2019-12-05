import Ex from './ex'
import UI from './ui'
import runSqueak from './squeak'
import Link from './link/main'
import sw_main from'./worker/main'
let win = (window || self || global) as any;
let chrome = win.chrome;
let svm: any, ex: Ex | undefined, svevt: any, link: Link = new Link(UI), server: any;
let s_canvas: any = new OffscreenCanvas(1000,1000);
if(chrome)ex = new Ex(chrome,UI,{getSqueakProxy: () => svevt && svevt.sProxy,getLink: () => link});
if((win as any).ServiceWorkerWare)server = new (win as any).ServiceWorkerWare();
if(win.require && !server)try{server = win.require('express')()}catch(err){};
if(win.document)link.listen(document.body);
runSqueak({url: win.location.protocol + '//' + win.location.hostname + '/squeak/squeak.image',component: win.document ? (UI.Current.getFramework().$rootComponent as any).SqueakDisplay : {element: {getContext(t: string){return s_canvas.getContext(t)}}}}).then(vm => {vm.on('load',(evt: any) => {svm = vm;svevt = evt;if(ex)ex.onSqueakLinked(svevt.sProxy)})});
sw_main(win);