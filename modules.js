olRuntime.module = function(dottedPath) {
    if (dottedPath === "") return window;
    var path = dottedPath.split("."),
        name = path.pop(),
        parent = olRuntime.module(path.join(".")),
        self = parent[name];
    var module_state = {        loaded: false,
        pending: []};
    if (!self) parent[name] = self = {
        $module_state: function(){return module_state},
        requires: function(req) {
            return {
                toRun: function(code) {
                    function load() {
                        code(function(){
                            module_state.loaded = true;
                            module_state.pending.forEach(function(f){f();});
                        });
                    }
                    if (req) {
                        req.forEach(function(r){
                            if(!olRuntime.module(r).$module_state().loaded)
                        olRuntime.module(r).$module_state().pending.push(load);
                        });
                    } else {
                        load();
                    }
                }
            };
        },
    };
    return self;
};
olRuntime.extend = function(obj /* + more args */ ) {
    // skip arg 0, copy properties of other args to obj
    for (var i = 1; i < arguments.length; i++)
        if (typeof arguments[i] == 'object')
            for (var name in arguments[i])
                obj[name] = arguments[i][name];
};
olRuntime.subclass = function(classPath /* + more args */ ) {
    // create subclass
    var subclass = function() {
        if (this.initialize) this.initialize.apply(this, arguments);
        return this;
    };
    // set up prototype
    var protoclass = function() { };
    protoclass.prototype = this.prototype;
    subclass.prototype = new protoclass();
    // skip arg 0, copy properties of other args to prototype
    for (var i = 1; i < arguments.length; i++)
    olRuntime.extend(subclass.prototype, arguments[i]);
    // add class to module
    var modulePath = classPath.split("."),
        className = modulePath.pop();
    olRuntime.module(modulePath.join('.'))[className] = subclass;
    return subclass;
};
