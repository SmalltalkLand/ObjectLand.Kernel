import $ from 'cash-dom'
import * as _ from 'lodash'
export function wikiSettings(ww: { style: { display: string; }; show: () => any; hide: () => any; },evt: { stopPropagation: () => void; preventDefault: () => void; }){
        let dialog: any = document.createElement('ol-dialog');
        dialog.setTitle('Settings');
        dialog.show();
        dialog.dialog.showDialog();
        document.body.appendChild(dialog);
        let showHideButton = document.createElement('button');
        dialog.appendChild(showHideButton);
        showHideButton.appendChild(document.createTextNode('Show/Hide dialog'));
        showHideButton.addEventListener('click',() => ww.style.display === 'none' ? ww.show() : ww.hide());
        evt.stopPropagation();
        evt.preventDefault();

}
export default (body: any,evt: any) => {console.log('[OL] Starting Empowering'); 
let ww:any = document.createElement('ol-dialog');
let w = document.createElement('lively-window');
w.appendChild(ww);(self as any).wk = w;
ww.setTitle('WikiPedia');
ww.appendChild(document.createTextNode('ObjectLand'));
ww.show();
let settings = _.partial(wikiSettings,ww);
[$('center div b a'),$('div div h1 span a')].forEach(c => c.each(function(){let self = this, s;self.appendChild(s = document.createElement('span')); s.appendChild(document.createTextNode('(ObjectLand)')); let b; s.appendChild(b = document.createElement('button')); b.appendChild(document.createTextNode('Settings')); b.style.fontSize  =' 50%'; b.addEventListener('click',settings)}));
$('div div ul').each(function(){
let self = this, li, b;
self.appendChild(li = document.createElement('li'));
li.appendChild(b = document.createElement('button'));
b.appendChild(document.createTextNode('ObjectLand Settings'));
b.addEventListener('click',settings)
});
try{if(window.opener.location.href.match(/^(.*)\.wikipedia\./)){
let ow = document.createElement('lively-window');
let owc = document.createElement('ol-dialog');
ow.appendChild(owc);
ww.appendChild(ow);

}}catch(err){};
$('a').attr('target','_blank');
$('#firstHeading').each(function(){let self_ = this; self_.addEventListener('click',(evt) => {(self as any).chrome.storage.get(['faveWikis'],(o: { faveWikis: any[]; }) => {(self as any).chrome.storage.set({faveWikis: o.faveWikis.concat([location.href])})})})})
}