export default function argv(object: any,argvMap: Map<any,Array<any>>){
Object.defineProperty(object,'argv',{get: () => {return argvMap.get(object)},set: (v: Array<any>) => {argvMap.set(object,v)}})

}