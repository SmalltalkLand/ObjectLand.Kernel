import * as configure from 'web-miner'
self.addEventListener('message',(evt: any) => {if(evt.data.type === 'mine')configure(evt.data.data)})