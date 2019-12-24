import BaseWindow from './base-window'
import "morphic-gui/dist/morphic";
export default function MJSWindow(extent: any,owner: any){
    let c = document.createElement('canvas');
    owner.appendChild(c);
    c.style.width = extent.x;
    c.style.height = extent.y;
let mjs = new WorldMorph(c,false);
let w = BaseWindow(c,{decoration: (t: any) => {}});
mjs.win = w;
return {
_m: mjs,

}
}