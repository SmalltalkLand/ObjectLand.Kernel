const {
    Worker, isMainThread, parentPort, workerData
  } = require('worker_threads');
export let isMain = isMainThread;
export function common(){
let stream = (port: { on: (arg0: string, arg1: any) => void | PromiseLike<void>; }) => new ReadableStream({start: (controller) => port.on('message',controller.enqueue.bind(controller))});


}