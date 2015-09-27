var test = require('tape');

var port = require('../');

test('get tcp port', function(t) {
	var result = port('service');

	t.ok(typeof result === 'number', 'port number ' + result);
	t.equals(port('service'), result);

	t.end();
});

test('get udp port', function(t) {
	var result = port('service', 'udp');

	t.ok(typeof result === 'number', 'port number ' + result);
	t.equals(port('service', 'udp'), result);

	t.end();
});
