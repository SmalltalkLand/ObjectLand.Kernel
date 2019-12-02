export interface Component{
addRenderListener(f: Renderer ): Function;
embed(other: Framework | HTMLElement): Function | void;
pipeDebuggingInfoTo(port: WritableStream): Function;
}
export interface Renderer{
(h: Function,prev: any): any;

}
export interface Framework{
    $rootComponent: Component;
$mount(dom:HTMLElement): Function; 
}

export class UI{
    public static Current: UI;
    private _m: any;
constructor(m: Framework){this._m = m}

}