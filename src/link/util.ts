export function doEnsureNotLinked(node: HTMLElement,callback: Function): void{
    let nodesThatAreOL = Array.prototype.filter.call(node.childNodes,(n: { classList: { includes: (arg0: string) => void; }; }) => n.classList.includes('ol-inject'));
    if(nodesThatAreOL.length)return;
    callback()

}
export function inject(node: HTMLElement){
node.classList.add('ol-inject')

}