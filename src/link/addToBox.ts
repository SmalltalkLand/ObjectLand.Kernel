import {doEnsureNotLinked, inject} from './util' 
export function Ln_addObjectLandToOSJSBox(elem: HTMLElement,host: any){
doEnsureNotLinked(elem,function(){
let menubars = Array.prototype.filter.call(elem.childNodes,(n: { classList: { includes: (arg0: string) => void; }; }) =>  n.classList.includes('osjs-gui-menubar'));
menubars.forEach(function(m: HTMLElement){
doEnsureNotLinked(m,function(){
    let mol = document.createElement('span');
    mol.innerText = 'ObjectLand';
    mol.addEventListener('click',host.ol_m_click.bind(host,mol))
m.appendChild(mol)
inject(m);
})

})
    inject(elem);
})

}