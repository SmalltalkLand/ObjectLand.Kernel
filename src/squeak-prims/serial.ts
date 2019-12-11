export default function serial(vm: any){
    function portReadWrite(type: string,argCount: number){
let count = vm.pop();
let index = vm.pop();
let sqByteArray = vm.pop();
let port = vm.ports.get(vm.pop());
if(type === 'write')port.write(String.fromCharCode(sqByteArray.bytes.slice(index - 1)));
if(type === 'read')port.read(count).then((s: string) => {
let bytes = s  .split('')
.map((x: { charCodeAt: (arg0: number) => number; })=>{
    return x.charCodeAt(0);
});
sqByteArray.bytes = sqByteArray.bytes.slice(index - 1).concat(bytes)
})
return true;

    };
let serial: any = {
    primitiveSerialPortWriteByName: portReadWrite.bind(null,'write'),
    primitiveSerialPortWrite: portReadWrite.bind(null,'write'),
    primitiveSerialPortReadByName: portReadWrite.bind(null,'read'),
    primitiveSerialPortRead: portReadWrite.bind(null,'read'),

};
vm.primHandler.builtinModules.SerialPlugin = new Proxy(vm.primHandler.builtinModules.SerialPlugin || {},{
get: (o: any,k: string) => serial[k] || o[k],

})

}