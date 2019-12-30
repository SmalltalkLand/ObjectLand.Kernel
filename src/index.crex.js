chrome.tabs.onUpdated.addListener(function(id,info,tab){
});
let treeMap;
chrome.runtime.onMessage.addListener(function(m,s,r){
if(m.type === 'load')chrome.tabs.executeScript( null, {code:m.data},r)
if(m.type === 'setTree'){
let old = treeMap.get(m.id);
let patches = diff(old,m.data);
r(patches);
treeMap.set(m.id,m.data);

}
})
export default {}