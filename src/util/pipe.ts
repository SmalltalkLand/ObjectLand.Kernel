export default function pipe(): Array<any>{
let rController: any, rResolve: Function;
return [new ReadableStream({start(cn){return new Promise(c => {rController = cn; rResolve = c})}}),new WritableStream({write(t){return Promise.resolve(rController.enqueue(t))},close(){rResolve()}})]

}