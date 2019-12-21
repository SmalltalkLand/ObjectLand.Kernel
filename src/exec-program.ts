import * as  _ from 'lodash-es'
export default function exec(p: any,config: any,std: any){
return _.partial(p(config),{get stdout(){return std.out},get stdin(){return std.in}})

}