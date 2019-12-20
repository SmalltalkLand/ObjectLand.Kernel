import w_eval from './eval.js'
import assign from './util/assign'
export default function Sheet(log: Function,win: any,dataObject: any,onFocusBlur: (elem: any,onFocus: Function,onBlur: Function) => void){
    let Storage: any = {};
return (element: any,id: string) => {
    onFocusBlur(element,(e: any) => {element.value = Storage[id]},(e: any) => {Storage[id] = element.value});
    var getter = () => {
        var value = Storage[id] || "";
        if (value.charAt(0) == "=") {
            return w_eval(assign({},dataObject,{log: log,chrome: undefined,get alert(){return win.olAlerter.alert},get prompt(){return win.olAlerter.prompt}}),value.substring(1))
        } else { return isNaN(parseFloat(value)) ? value : parseFloat(value); }
    };
    Object.defineProperty(dataObject, id, {get:getter});
    Object.defineProperty(dataObject, id.toLowerCase(), {get:getter});

}

}