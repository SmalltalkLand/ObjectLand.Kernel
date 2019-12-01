export default ((window as any).olApps = class App extends Object{
    private _data: any;
    public name: string;
    public closeListeners: Array<Function>;
    static get registry(){return (this as any)._registry || ((this as any)._registry = new Map())}
static register(name: string,data: any): Function{
    let old = this.registry.get(name);
this.registry.set(name,new this().init(data));
    return () => {this.registry.set(name,old)}
} 
init(data: any){this._data = data}
renderWindow(h: any,prev: any): any{
return h(h.window,{onClose: this.onClose.bind(this)},[prev])

}
onClose(): Promise<any>{
let mp = Promise.all(this.closeListeners.map(l => l(this))).then(a => ({listenerResults: a}));
let rfr = Promise.resolve(this.name && fetch('https://universe.ol.com/' + this.name + '/ping').then(r => r.text()).catch(err => undefined));
return Promise.all([mp,rfr]).then(r => ({listenerResults: r[0],fetchResult: r[1]}))
}
})