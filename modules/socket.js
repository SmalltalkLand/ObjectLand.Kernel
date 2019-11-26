olRuntime.module('ol.socket').requires([]).toRun(function(c){
olRuntime.subclass.call(Object,'ol.socket.Socket',{
initialize: function(ws){this._ws = ws},

});
olRuntime.subclass.call(ol.socket.Socket,'ol.socket.LiveSocket',{
initialize: function(ws,cred){this._cred = cred},
addInstruction: function(str,ins){this._ws.send(JSON.stringify({credential: this._cred,instruction: 'add instruction',parameters: {body: str, instructionToAdd: ins}}))},
call: function(ins,params){this._ws.send(JSON.stringify({instruction: ins,parameters: params}))},
newProxy: function(){return new Proxy(this,{get: function(o,k){return o.call.bind(o,k)},set: function(){throw new Error('not mutable')}})},
})
  c();  
})