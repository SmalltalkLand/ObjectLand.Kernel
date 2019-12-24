import $ from 'cash-dom'
import "morphic-gui/dist/morphic";
export default class extends Morph{
    public vms: Array<any> | undefined;
    public sys: any;
contextMenu(){
let m = super.contextMenu();
let wm = this.world().contextMenu();
let $w = $(this.world().canvas);
wm.items.forEach((i: any) => m.addItem(...i));
let vms = this.vms;
if(vms)vms.forEach(v => m.addMenu(v.appName,(v.ol_menu as Array<Array<any>>).reduce((m,i) => {m.addItem(...i); return m},new MenuMorph())));
m.addItem('Delete Canvas',$w.detach.bind($w));
if(this.sys)m.addMenu('System',this.sys.menu.call(this.sys,MenuMorph,$w));
return m
}

}