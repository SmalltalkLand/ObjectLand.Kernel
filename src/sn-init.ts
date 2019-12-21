import * as  _ from 'lodash-es'
export default function sn_init(snap: any,win: any,enq: any,allApps: Array<WritableStream>){
    var alertPorts = new MessageChannel();
    var consolePorts = new MessageChannel();
    snap.postMessage({type: 'initPorts',alertPort: alertPorts.port2,consolePorts: consolePorts.port2},'*',[alertPorts.port2,consolePorts.port2]);
    alertPorts.port1.addEventListener('message',_.debounce(win.alertPort.postMessage.bind(win.alertPort),500));
    win.alertPort.addEventListener('message',_.debounce(alertPorts.port1.postMessage.bind(alertPorts.port1),500));
    consolePorts.port1.addEventListener('message',evt => enq(evt.data));
    allApps.push(new WritableStream({write: consolePorts.port1.postMessage.bind(consolePorts.port1)}));

}