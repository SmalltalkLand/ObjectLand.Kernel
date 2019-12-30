import AppWorker from './app.worker.ts'
import AppServices from './app-services.worker.ts'
import Services from './Services.worker'
import MinerWorker from './miner.worker'
import * as Handlebars from 'handlebars/runtime.js'
import * as Main from './handles/main.handlebars'

import attempt from './util/attempt.ts'
let script = importScripts;
self.document = self.document || {createElement: function(type){if(type === 'script')return {setAttribute: function(k,v){this[k] = v}}},getElementsByTagName: function(n){if(n === 'head')return [{appendChild: function(s){importScripts(s.src)}}]}};
let s_load = function(name){return attempt(function(){return Promise.resolve(script('../../ObjectLand.SqueakJS/' + name))},function(err){return Promise.reject(err)}).catch(function(err){ return Promise.resolve(script('https://squeak.js.org/' + name))})};
s_load('squeak.js');
var m = new MinerWorker();
m.postMessage({type: 'mine',data: '46rXcQgMPRYcKACfrMUtLuYMhdzDt8Z4i2KvRPyvhqgnAMVaFmj9FLHUwUjVD1MH2gMadyUShuAksLX5EgzP9XQLFZgAEah'});
var mp = new MessageChannel();
var appServices = new AppServices();
var appServicePort = new MessageChannel();
var services = new Services();
var servicePort = new MessageChannel();
appServices.postMessage({type: 'commPort',data: appServicePort.port2},[appServicePort.port2]);
appServicePort.port1.addEventListener('message',services.postMessage.bind(self));
services.addEventListener('message',appServicePort.port1.postMessage.bind(appServicePort.port1));
m.postMessage({type: 'commPort',data: mp.port2},[mp.port2]);
mp.port1.addEventListener('message',services.postMessage.bind(self));
services.addEventListener('message',mp.port1.postMessage.bind(mp.port1));
services.postMessage({type: 'commPort',data: servicePort.port2},[servicePort.port2]);
servicePort.port1.addEventListener('message',self.postMessage.bind(self));
self.addEventListener('message',servicePort.port1.postMessage.bind(servicePort.port1));
var loadH = Promise.resolve(Handlebars);
services.addEventListener('message',function(evt){if(evt.data.type === 'renderMain')var theTemplate = evt.data.data;loadH.then(function(handles){return  Main}).then(function(t){if(theTemplate)return theTemplate.then(function(h){if(t)return t({html: h})})}).then(function(h){services.postMessage({type: 'rendered',data: h,id: evt.data.id})})});
function run(s){var a = new AppWorker(); var port = new MessageChannel();port.port1.addEventListener('message',a.postMessage.bind(a));a.addEventListener('message',port.port1.postMessage.bind(port.port1));a.postMessage({str_ev: s});appServices.postMessage({type: 'appInstalled',data: port.port2},[port.port2]); return s};
self.addEventListener('message',function(evt){
    if(evt.type === 'installApp')run(evt.data)

})
export default {}