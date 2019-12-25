import { Terminal } from "xterm";

export default (worker: any,term: Terminal) => {term.onData(d => worker.postMessage({type: 'readTerm',data: d})); worker.addEventListener('message',(evt: { type: string; data: any; }) => {if(evt.type === 'termWrite')term.write(evt.data)}); return term}