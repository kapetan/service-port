# service-port

Map a service name to a port number. Use instead of hard-coding port numbers when running services locally.

	npm install service-port

# Usage

The module hashes a name to a valid port number, excluding values registered with [IANA](http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml).

```javascript
var port = require('service-port');
console.log(port('my-service'));
```

The above will always print `7935`. As an optional second argument the module accepts a protocol name (e.g. `tcp`, `udp` or `sctp`), which is used to filter out reserved port numbers for that protocol. It defaults to `tcp`.

```javascript
console.log(port('my-service', 'tcp')); // prints 7935
console.log(port('my-service', 'udp')); // prints 59577
```
