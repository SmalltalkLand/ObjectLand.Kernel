import {doEnsureNotLinked, inject} from './util' 

export function Ln_addObjectLandToIcon(node: HTMLElement,ui: any){
    doEnsureNotLinked(node,function(){
        if(!ui)return;
        let newNode = document.createElement('span');
        node.appendChild(newNode);
    newNode.addEventListener('click',ui.titleClickNative.bind(ui,node))
inject(newNode);
    })
}