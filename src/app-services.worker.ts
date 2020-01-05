let commPort: any;
let blocked: boolean = false;
self.addEventListener('message',evt => {
if(evt.data.type === 'commPort')commPort = evt.data;
if(evt.data.type === 'setBlocked'){blocked = true};
if(evt.data.type === 'appInstalled'){let port = evt.data.port; if(blocked){port.postMessage({type: 'setBlocked'})}}
})
export default {}