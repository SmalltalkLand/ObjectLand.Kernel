import $ from 'cash-dom'
import drag from './drag.js'
export default function BaseWindow(theElem: HTMLElement,opts: any = {}){
    let d = document.createElement('div');
    theElem.parentNode.appendChild(d);
    d.appendChild(theElem);
    let t = opts.title || document.createElement('span');
    $(d).prepend(t);
drag(t,d);
opts.decoration(t);
return {
_d: d,
_t: t

}

}