import {proxy} from './api'
export function syncWorker(win: any,className: string): any{
return proxy(win,new Worker('ol/main.js?wclass=' + encodeURIComponent(className)))

}