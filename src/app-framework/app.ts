export default ((window as any).olApps = class App extends Object{
    private _data: any;
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
onClose(): void{


}
})