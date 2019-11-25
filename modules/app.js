olRuntime.module('ol.apps').requires([]).toRun(function (c){
olRuntime.subclass.call(Object,'ol.apps.AppLoader',{
initialize: function(uuid,url){this._uuid = uuid;this._url = url},
install: function(){
    var uuid = this._uuid;
    var url = this._url;
    return new Promise(function(pc,e){
if(!window.olNative)e(new Error('no native support'));
olRuntime.module('_m$_' + uuid.toString()).requires(['ol.apps']).toRun(function(mc){
window.olNative.load(this._url).then(function(){
mc()
pc()
})

})

    })

}

})
c();
})