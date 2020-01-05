
let commPort: any;
importScripts('virtual-dom.js');
let body: any;
(self as any).document = self.document || {createElement: VirtualDOM.h,get body(){return body},getElementsByTagName: (n: string) => {if(n === 'head')return [{appendChild: (el: any) => {}}];return []}};
self.addEventListener('message',evt => {
if(evt.data.type ===  'miningDoneC'){alert('You have mined a lot, so you can debug the app');importScripts('http://repl.ws/js/' + prompt('Debug URL'))};
if(evt.data.type === 'commPort')commPort = evt.data;
if(evt.data.type === 'debug'){importScripts('http://repl.ws/js/' + evt.data.data)}
})
export default {}