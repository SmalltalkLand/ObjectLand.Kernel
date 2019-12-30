let commPort: any;
self.addEventListener('message',evt => {
if(evt.data.type === 'commPort')commPort = evt.data;

})
export default {}