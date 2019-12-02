import Ex from './ex'
import UI from './ui'
let chrome = (window as any).chrome;
if(chrome)new Ex(chrome,UI)