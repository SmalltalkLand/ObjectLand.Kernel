import evalWorker from './eval-worker.worker'
self.addEventListener('message',evt => {if(evt.data.type === 'install'){let w;(w = new evalWorker()).postMessage(evt.data.data)}})

export default {} as any