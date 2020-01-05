import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash-es';
function renderSub(p: any,vn: any){
    if(!p)return;
        let hasNoNode = true;
        let render = (n: Element) => ReactDOM.render(vn,n);
        _.forEach(p.childNodes,(n: HTMLElement) => {
            if(_.includes(n.classList,'ol')){
                hasNoNode = false;
                render(n);
            }
        });
        if(hasNoNode){let n = document.createElement('span');n.classList.add('ol');p.appendChild(n); render(n) }

}
export default class extends React.Component{
    private observer: MutationObserver;
    private dialog: any;
    private input: any;
    constructor(p = {}){super(p);this.state = {edu: false} as any;this.onValueOfInputChanged = this.onValueOfInputChanged.bind(this); this.onTextOfInputChanged = this.onTextOfInputChanged.bind(this)}
    onValueOfInputChanged(e: any){document.querySelector(this.input.value).value = e.target.innerText}
    onTextOfInputChanged(e: any){document.querySelector(this.input.value).innerText = e.target.innerText}
render(){
    try{
    renderSub(document.querySelector('.docent, docent-element'),<span ref = {n => {this.setState({edu:true})}}>EDU Detected</span>);
    if(this.dialog)ReactDOM.render(<div>{this.input && (<div>
    Value: <textarea value = {document.querySelector(this.input.value)?.value || ''} onChange = {this.onValueOfInputChanged}></textarea>
    {!(this.state as any).edu && <span>>Text: <textarea value = {document.querySelector(this.input.value)?.innerText || ''} onChange = {this.onTextOfInputChanged}></textarea></span>}
    </div>)}</div>,this.dialog);
    return (<span>{ReactDOM.createPortal(<span id = "topbar"><input type = "text" ref = {v => {let o = this.input;this.input = v; if(o !== v){requestAnimationFrame(this.forceUpdate.bind(this))}}}></input>{(self.Array as any).prototype.map.call(document.querySelectorAll('ol-dialog'),(elem: any,i: number) => {return (<button key = {i} onClick ={elem.show.bind(elem)}>{elem.title}</button>)})}{(this.props as any).items?.map((i: any) => (<span key = {i.id}><img> src = {i.url} onclick = {i.onclick}</img></span>))}</span>,document.getElementById('topbar') || document.createElement('span'))}</span>);
}catch(err){return (<span>Error</span>)}};
    componentDidMount(){this.dialog = document.createElement('ol-dialog') || document.createElement('div');if(this.dialog.appendChild){this.dialog.setTitle('ObjectLand')}else{this.dialog = document.createElement('div')};document.body.appendChild(this.dialog);this.observer = new MutationObserver(ml => {ml.forEach(m => {if(m.type === 'childList'){([].concat.call(m.addedNodes,m.removedNodes) as Array<any>).filter(e => e.tagName === 'ol-dialog').length && this.forceUpdate()}})}); this.observer.observe(document.body,{childList: true,subtree: true})}
    componentWillUnmount(){this.observer.disconnect(); document.body.removeChild(this.dialog)}
}