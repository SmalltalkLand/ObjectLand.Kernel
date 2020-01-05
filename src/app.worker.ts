import sandbox from './lib/sandbox.js'
let apiMap: Map<string,any> = new Map();
let blocked: boolean = false;
self.addEventListener('message',m => {if(m.type === 'setBlocked')blocked = true});
self.addEventListener('message',evt => evt.data  && evt.data.str_ev instanceof String && !blocked && (sandbox(evt.data.str_ev,{get: (_o: any,k: string) => apiMap.get(k),set: (_o: any,k: string,v: any) => apiMap.set(k,v)}).then(r => {r({postMessage: self.postMessage.bind(self),onMessage: self.addEventListener.bind(self,'message')})})))