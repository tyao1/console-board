// Safari has no Proxy
const isProxyAvailable = !!window.Proxy;

// original console
const __console = window.console;

/*
  @param: fn  - function to run when console.* is called
  @return: patched console object
*/
export default function patchConsole(fn) {
  if (!fn) __console.error('A function is required');
  if (isProxyAvailable) {
    const handler = {
      get: (target, name) => {
        if (name in target) {
          const func = target[name];
          if (typeof func === 'function') {
            const patched = function () {
              fn({ name, date: Date.now(), args: arguments });
              func.apply(__console, arguments);
            };
            if (Object.getOwnPropertyDescriptor(patched, 'name').configurable) {
              Object.defineProperty(patched, 'name', { value: name, configurable: true });
            }
            return patched;
          }
        }
        return target[name];
      },
    };

    return new Proxy(__console, handler);
  }

  /*
   Assume its in safari
   proxy is not available, replace the function
   The functions reside in its prototype
  */
  const clone = Object.assign({}, Object.getPrototypeOf(__console));
  Object.keys(clone).forEach(name => {
    const func = clone[name];
    if (typeof func === 'function') {
      const patched = function () {
        fn({ name, date: Date.now(), args: arguments });
        func.apply(__console, arguments);
      };
      if (Object.getOwnPropertyDescriptor(patched, 'name').configurable) {
        Object.defineProperty(patched, 'name', { value: name, configurable: true });
      }
      clone[name] = patched;
    }
  });
  return clone;
}

/*
  The untouched console object
*/
patchConsole.originConsole = __console;
