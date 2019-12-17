export default class AppManager{
    allApps: any[];
    getCurrent: () => any;
    setCurrent: (v: any) => void;
constructor(theAllApps: Array<any>,opts: {getCurrent: () => any,setCurrent: (v: any) => void}){
this.allApps = theAllApps;
this.getCurrent = opts.getCurrent;
this.setCurrent = opts.setCurrent;

}

}