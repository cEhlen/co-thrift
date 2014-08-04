co-thrift
=========

Co wrapper for thrift clients.

The wrapper just searches the prototype for every method, which does not start
with `send_` or `recv_` and replaces it with a version you can yield. This may
not be save, but it works for my purpose.

WARNING: The client prototype gets changed. This could be a problem.

Installation
============

```bash
$ npm install co-thrift
```

Example
=======

Just do as you normally do in thrift, but pass the Client object to the wrapper.

Line:
```js
var client = thrift.createClient(wrapper(StreamingService.Client), connection);
// ...
yield client.establishStream(name, '', port);
```

Full Example:

```js
var wrapper = require('co-thrift'),
    thrift = require('thrift')
    StreamingService = require('./StreamingService');

var transport = thrift.TFramedTransport;
var protocol = thrift.TBinaryProtocol;

var connection = thrift.createConnection('host', port, {
    transport: transport,
    protocol: protocol
});

connection.on('error', function (err) {
    console.log(err);
});

var client = thrift.createClient(wrapper(StreamingService.Client), connection);

module.exports.establish = function *establish (name) {
    yield client.establishStream(name, '', port);
}
```

License
=======
ISC
