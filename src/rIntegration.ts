export default function(win: any,state: any = {p: Promise.resolve()},action: any,next: any): any{
    if(action.type === 'postPromise')return next(Object.assign({},state,{p: state.p.then((v: any) => action.data(v))}),action)
return next(state,action)

}