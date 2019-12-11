export default function scratch(vm: any,win: any){
vm.primHandler.setWindowTitle = ((old: Function) => (argCount: number) => {if(win.ScratchSettings && win.ScratchSettings.useNormalWindowTitle && old)return old(argCount); vm.parent.titleMap.set(vm,vm.pop().bytesAsString()); return true})(vm.primHandler.setWindowTitle && vm.primHandler.setWindowTitle.bind(vm.primHandler));


}