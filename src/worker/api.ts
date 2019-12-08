export function proxy(win: any,worker: Worker){return win.Comlink.proxy(worker)}
export function expose(win: any,api: any){win.Comlink.expose(api,win)}