var thunkify = require('thunkify'),
    _ = require('underscore');

// Just wrapts the client inside thunkify so we can use generators.
// We just use every method except the send_* and recieve_* methods.
module.exports = function (client) {
    _.chain(client.prototype)
        .pairs()
        .each(function (pair) {
            if(_.isFunction(pair[1]) && !(/send_.*/.test(pair[0]) || /recv_.*/.test(pair[0]))) {
                client.prototype[pair[0]] = thunkify(pair[1]);
            }
        });

    return client;
};
