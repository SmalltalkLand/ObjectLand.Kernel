import {wikiSettings} from '../empower/wikipedia'
import * as _ from 'lodash-es';
import * as Tone from "Tone";
export default (window: string = 'lively-window') => {
    let synth = new Tone.MembraneSynth().toMaster()
let main = document.createElement(window);
let oDialog: any = document.createElement('ol-dialog');
oDialog.setTitle('ObjectLand');
oDialog.show();
let desk = document.createElement(window);
main.appendChild(oDialog);
oDialog.appendChild(desk);
let deskDialog: any = document.createElement('ol-dialog');
deskDialog.show();
desk.appendChild(deskDialog);
let manager = document.createElement(window);
deskDialog.appendChild(manager);
let term = document.createElement('lively-xterm');
let twin = document.createElement(window);
twin.appendChild(term);
deskDialog.appendChild(twin);
let wk;
if((self as any).wk){deskDialog.appendChild(wk = (self as any).wk); delete (self as any).wk};
if(location.href.match(/^(.*)\.wikipedia\./)){let b;deskDialog.appendChild(b = document.createElement('button')); b.appendChild(document.createTextNode('Wikipedia Settings')); b.addEventListener('click',_.partial(wikiSettings,wk))};
document.body.appendChild(main);

}