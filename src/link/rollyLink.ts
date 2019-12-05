import {doEnsureNotLinked, inject} from './util' 
export function rollyLink(elem: HTMLElement,link: any){
doEnsureNotLinked(elem,function(){
elem.addEventListener('olStartup',link.olStartup.bind(link,elem))
    inject(elem);
})

}