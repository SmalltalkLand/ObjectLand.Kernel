export default function sandboxJS(js,p) {
    var handlers = {
      has(target,key,context) {
          return true
      }
    };
    var proxy = new Proxy(new Proxy(global || self,p),handlers);
    var proxyName = `proxy${Math.floor(Math.random() * 1E9)}`;
    var fn = new Function(proxyName,`with(${proxyName}){${js}}`);
    return fn.call(this,proxy);
  }
  