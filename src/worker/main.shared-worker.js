import MainWorker from './main.worker.ts'
var w = new MainWorker();
self.addEventListener('message',function(evt){w.postMessage(evt.data,evt.data.transferables)});
w.addEventListener('message',function(evt){self.postMessage(evt.data,evt.data.transferables)});
export default {}