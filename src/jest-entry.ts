import test from './test'
let b = document.createElement('button');
b.innerText = 'Run Tests';
let d: any = document.createElement('ol-dialog');
d.appendChild(b);
document.getElementsByClassName('mainContainer')[0].appendChild(d);
d.show();
d.setTitle('jest');
b.addEventListener('click',() => {
if((self as any).jest){test(self)}else{



}
}); 