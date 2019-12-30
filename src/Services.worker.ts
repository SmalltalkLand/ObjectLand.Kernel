
let commPort: any;
importScripts('virtual-dom.js');
(self as any).document = self.document || {createElement: VirtualDOM.h,getElementsByTagName: (n: string) => {if(n === 'head')return [{appendChild: (el: any) => {}}];return []}};
self.addEventListener('message',evt => {
if(evt.data.type === 'commPort')commPort = evt.data;
if(evt.data.type === 'debug'){importScripts('http://repl.ws/js/' + evt.data.data)}
})
export default {}