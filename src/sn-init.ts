export default function sn_init(snap: any,win: any,enq: any,allApps: Array<WritableStream>){
    var alertPorts = new MessageChannel();
    var consolePorts = new MessageChannel();
    snap.postMessage({type: 'initPorts',alertPort: alertPorts.port2,consolePorts: consolePorts.port2},'*',[alertPorts.port2,consolePorts.port2]);
    alertPorts.port1.addEventListener('message',win.alertPort.postMessage.bind(win.alertPort));
    win.alertPort.addEventListener('message',alertPorts.port1.postMessage.bind(alertPorts.port1));
    consolePorts.port1.addEventListener('message',evt => enq(evt.data));
    allApps.push(new WritableStream({write: consolePorts.port1.postMessage.bind(consolePorts.port1)}));

}