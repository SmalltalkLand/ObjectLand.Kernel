export default function createSyscalls(providers: Array<any>,cls: any,kernel: any): any{
return new Proxy(new cls(kernel),{get: (o,k) => providers.reduce((v,p) => p.forward(v,o),o[k]),set: (o,k,v) => providers.reduce((v,p) => p.reverse(v,o,k),(nv: any) => o[k] = nv)(v)})

}
export function createJSWriteStream(thePipe: any): WritableStream<Buffer>{
return new WritableStream({write: (v) => new Promise(c => thePipe.write(new Buffer(v),0,c))})

}
export function createJSReadStream(thePipe: any): ReadableStream<Buffer>{
return new ReadableStream({start: (controller) => {let pump = () => {
var buffer = new Buffer(1);
thePipe.read(buffer,0,() => {controller.enqueue(buffer); pump()})

}; pump()}})

}
export function init_bxKernel(kernel: any,opts: any){
let stream = createJSReadStream(kernel.ports[9998]);
if(opts.rolly){opts.rolly.doPipeBufStream(stream,(t: any) => new TransformStream({transform(chunk,controller){controller.enqueue(chunk.toString())}}))}
}