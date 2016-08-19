var handler = {
    get: function(target, name){
        if (name in target) {
           var func = target[name];
           if (typeof func === 'function') {
   return function() {
      console.info('[' + new Date() + ']', arguments);
      func.apply(console, arguments);
   }
}
} return target[name];
var console = new Proxy(console,handler)
var _snapshot = Object.assign({}, console)
console.log = function() {
      _snapshot.info('[' + new Date() + ']', arguments);
      _snapshot.log.apply(_snapshot, arguments);
   }
   