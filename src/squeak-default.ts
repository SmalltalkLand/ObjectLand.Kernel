import * as  _ from 'lodash-es'
import runSqueak from './squeak'
import UI from './ui'

export default  (vmcls: any,std : any,{win,kapi,s_canvas,argv,serialPrimLoader,scratchPrimLoader,initRequest,chrome,argvGlobalMap,services,ex}: any) => _.once(_.partial(runSqueak,({Squeak: vmcls,url: win.location.protocol + '//' + win.location.hostname + '/squeak/squeak.image',component: {element: {getContext(t: string){
    if(win.document && UI.Current)return (UI.Current.getFramework().$rootComponent as any).SqueakDisplay.element.getContext(t);
    if(kapi.getSqueakContext)return kapi.getSqueakContext(t);
    return s_canvas.getContext(t)
}}},
then: (vm: any) => {Promise.resolve(vm).then(vm => {win.onRollyAdded = ((old: Function | undefined) => (rolly: any) => {rolly.initSqueak(vm); return old(rolly)})(win.onRollyAdded); return vm}).then(vm => {if(kapi.onSqueakLinked)return kapi.onSqueakLinked(vm).then((_v: any) => vm); return vm}).then(vm => {argv(vm.primHandler.display,argvGlobalMap);vm.titleMap = new Map(); scratchPrimLoader(vm,win);serialPrimLoader(vm);let JSClass: any;vm.builtinModules.ObjectLandKernelWebPlugin = {
    getBody(argCount: number){vm.pop(); vm.push(vm.primHandler.makeStObject(initRequest && initRequest.body,JSClass)); return true},
    setJSClass(argCount: number){vm.push(JSClass = vm.pop()); return true},
    addPrimitive(argCount: number){
        let popped = vm.pop(), jsObject = popped.jsObject;
         if(!jsObject){vm.push(popped); jsObject = vm};
         let moduleName; 
         (jsObject.primHandler.loadedModules[moduleName = vm.primHandler.js_fromStObject(vm.pop())] || jsObject.primHandler.builtinModules[moduleName]|| (jsObject.primHandler.loadedModules[moduleName] = {}))[vm.primHandler.js_fromStObject(vm.pop())] = ((f: Function) => (argCount: number) => {
let unfreeze: Function = jsObject.freeze();
f(jsObject).then(unfreeze);
return true

    })(vm.js_fromStBlock(vm.pop())); vm.push(vm.pop()); return true},
    addProperty(argCount: number){
        let index = vm.pop() - 1,
        theGet = vm.primHandler.js_fromStObject(vm.pop(),JSClass),
        theSet = vm.primHandler.js_fromStObject(vm.pop(),JSClass), 
        p, cachedValue: any;
        
        Object.defineProperty((p = vm.pop()).pointers || p.bytes || p.words,index === -1 ? 'sqClass': index,{get: () => {theGet().then((v: any) => cachedValue = v);return cachedValue},set: (v: any) => {theSet(v)}}) 
    },
    onMessage(argCount: number){window.addEventListener('message',vm.primHandler.js_fromStObject(vm.pop(),JSClass).bind(window,window.postMessage.bind(window))); vm.push(true); return true},
    runVM(argCount: number){let theArgs = new Array(1).map(vm.pop.bind(vm)); let unfreeze: Function = vm.freeze(); runSqueak(vm.fromStObject(theArgs[0])).then(nvm => {Object.defineProperty(nvm,'parent',{get: () => vm}); unfreeze(); serialPrimLoader(nvm); scratchPrimLoader(nvm,win); vm.push(vm.primHandler.makeStObject(nvm,JSClass))}); return true},
    sendChromeMessage(argCount: number){let message = vm.primHandler.js_fromStObject(vm.pop(),JSClass); if(chrome){let unfreeze: Function = vm.freeze(); chrome.runtime.postMessage(message,(result: any) => {vm.push(result); unfreeze()})}; return true},
    onChromeMessage(argCount: number){let messageHandler = vm.primHandler.js_fromStObject(vm.pop(),JSClass); if(chrome){chrome.runtime.onMessage.addListener(messageHandler)}; return true},
    get getServices(){if(!services)return (argCount: number) => {return false}; return (argCount: number) => {vm.pop(); vm.push(vm.push(vm.primHandler.makeStObject(services,JSClass))); return true}},
    get kapiPrimitive(){return kapi.primitive.bind(kapi,vm)},
}; vm.on('load',(evt: any) => {;if(ex())ex().onSqueakLinked(evt.sProxy)})}).catch(console.log.bind(console));
Object.defineProperty(vm,'stdout',{get: () => std.stdout.write.bind(std.stdout)});
Object.defineProperty(vm,'stdin',{get: () => std.stdin.read.bind(std.stdin)});
return vm;
},

})));