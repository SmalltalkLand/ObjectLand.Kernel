import {Ln_addObjectLandToIcon} from './addToIcon'
import {Ln_addObjectLandToOSJSBox} from './addToBox'
import {rollyLink} from './rollyLink'
export default class Link{
private _ui: any;
private options: any;
constructor(ui: any,options: any){this._ui = ui;this.options = options}
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
if(m.addedNodes)m.addedNodes.forEach(function(addedNode: any){
    if(addedNode.classList){
        let flags;
if(([] as any).includes.call(addedNode.classList,'osjs-window-icon'))Ln_addObjectLandToIcon(addedNode,ui);
if(([] as any).includes.call(addedNode.classList,'osjs-gui-box'))Ln_addObjectLandToOSJSBox(addedNode,this as any);
if(([] as any).includes.call(addedNode.classList,'ol-rolly-injected'))rollyLink(addedNode,this as any);
if((flags = ([] as any).filter.call(addedNode.classList,(s: string) => s.startsWith('green-flag'))).length)flags.forEach((f: any) => f.addEventListener('click',this.options.onFlagScratchClicked.bind(f,this)));
    }
});
})

}
}