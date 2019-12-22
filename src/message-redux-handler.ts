export default function(redo: any,state: any,action: any): any{
if(!(action.type === 'message'))return state;
return redo(state,action.data.data)
}