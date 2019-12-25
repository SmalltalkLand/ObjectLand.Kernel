import pipeStreams from '../util/pipe'
import {pipe} from '../pipe-funcs'
import messageTrans from '../message-trans'
import wware from './ware'
import id from '../util/id'

import * as  _ from 'lodash-es'

import nativeCodeWorker from './native-code.worker'
import nonNativeWorker from './non-native.worker'
let mx: any;
let worker = (self as any) as Worker;
let ports = new Map();
let h: any;
worker.addEventListener('message',pipe(h = ((evt: { data: { type: string, data: any } }) => {
if(evt.data.type === 'installAppTemp')fetch(evt.data.data.script).then(r => r.text()).then(s => {h({data: {type: 'addJS',data: {}}}).postMessage({type: 'install',data: s})});
    if(evt.data.type === 'addWASM'){let portID = Math.round(Math.random() * 100000); ports.set(portID,new nativeCodeWorker());  return {data: ports.get(portID)}}
    if(evt.data.type === 'addJS'){let portID = Math.round(Math.random() * 100000); ports.set(portID,new nonNativeWorker());  return {data: ports.get(portID)}}
})));
let ping = worker.postMessage.bind(self,{type: 'ping'});
let pingp = (v: any) => {ping(); return v};
let sendp = (evt: any) => new Promise(c => {let id_: any;worker.postMessage({...evt,id: id_ = id()}); worker.addEventListener('message',function a(evt){if(evt.data.id === id_){worker.removeEventListener('message',a); return c()}})});
let sn_trigger = (evt: any) => sendp({type: 'snTrigger',data: evt});
let sends = new WritableStream({write: sendp as any});
worker.addEventListener('message',pipe(wware,pingp,messageTrans,worker.postMessage.bind(worker)));
export default {} as any;