import sandbox from './lib/sandbox.js'
let apiMap: Map<string,any> = new Map();

self.addEventListener('message',evt => evt.data  && evt.data.str_ev instanceof String && sandbox(evt.data.str_ev,{get: (_o: any,k: string) => apiMap.get(k),set: (_o: any,k: string,v: any) => apiMap.set(k,v)}))