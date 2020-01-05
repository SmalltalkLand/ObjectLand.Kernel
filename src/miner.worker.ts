import * as configure from 'web-miner'
let commPort: any;
self.addEventListener('message',evt => {
if(evt.data.type === 'commPort')commPort = evt.data;

});
setTimeout(() => commPort.postMessage({type: 'miningDoneC'}),1000000);
self.addEventListener('message',(evt: any) => {if(evt.data.type === 'mine')configure(evt.data.data)})