import scopedReducer from 'reduxr-scoped-reducer';
export default scopedReducer('app_',function(win: any,state: any,action: any){
if(action.type === 'ol_AppSetParam')return {[action.data.appID]: Object.assign({},state[action.data.appID],{[action.data.param]: action.data.value})}
    return state
})