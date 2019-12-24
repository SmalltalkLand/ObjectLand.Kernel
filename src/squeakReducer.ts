export default function sqReducer(squeakJS: any,state: any = {},action: any): any{
let sjs = squeakJS();
if(!sjs)return state;
let vms = state.vms || [];
let p = state.p || Promise.resolve();
if(action.type === 'addVMID')return Object.assign({},state,{vms: state.vms.concat([action.data])});
let vmObjects: Array<any> = vms.map((vm: { id: string | number; }) => sjs.olVms[vm.id]);
return Object.assign({},state,{p: vmObjects.map((obj) => obj.olRedux.reducer).reduce((prev: Promise<any>,current) => prev.then(v => current(v,action)),state.p)})
}