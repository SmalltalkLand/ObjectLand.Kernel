import {Ln_addObjectLandToIcon} from './addToIcon'
import {Ln_addObjectLandToOSJSBox} from './addToBox'
import {rollyLink} from './rollyLink'
export default class Link{
private _ui: any;
constructor(ui: any){this._ui = ui;}
listen(elem: HTMLElement): Function{
let observer = new MutationObserver(this.mutated.bind(this));
observer.observe(elem,{ attributes: true, childList: true, subtree: true });
return observer.disconnect.bind(observer)
}
olStartup(elem: HTMLElement): void{


}
ol_m_click(mol: HTMLElement,evt: any): void{


}
mutated(mutationsList: Array<any>,observer: any): void{
    let ui: any = this._ui.Current;
mutationsList.forEach(function(m: any){
let target: HTMLElement = (m.target as HTMLElement)
m.addedNodes.forEach(function(addedNode: any){
if(addedNode.classList.includes('osjs-window-icon'))Ln_addObjectLandToIcon(addedNode,ui)
if(addedNode.classList.includes('osjs-gui-box'))Ln_addObjectLandToOSJSBox(addedNode,this as any);
if(addedNode.className.includes('ol-rolly-injected'))rollyLink(addedNode,this as any)

});
})

}
}