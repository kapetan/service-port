var hash = require('hash-index');
var ports = require('service-names-port-numbers')();

var reserved = function(target) {
	var numbers = [];
	var put = function(n) {
		if(n < 1024) return;

		var last = numbers[numbers.length - 1];

		if(n > last || !numbers.length) numbers.push(n);
		else if(n < last) {
			var i = numbers.length - 1;
			while(i >= 0 && n < numbers[i]) i = i - 1;
			numbers.splice(i + 1, 0, n);
		}
	};

	ports.forEach(function(entry) {
		var name = entry.ServiceName;
		var description = entry.Description;
		var protocol = entry.TransportProtocol;
		var port = entry.PortNumber;

		var used = (name || description.toLowerCase() === 'reserved') &&
			port && (protocol === target || !protocol);

		if(used) {
			var pair = port.split('-');
			var min = parseInt(pair[0], 10);

			if(pair.length === 1) {
				put(min);
			} else {
				var max = parseInt(pair[1], 10);
				for(var i = min; i <= max; i++) put(i);
			}
		}
	});

	return numbers;
};

var available = function(target) {
	var i = 0;
	var omit = reserved(target);
	var result = [];

	for(var n = 1024; n <= 65535; n++) {
		if(omit[i] === n) i++;
		else result.push(n);
	}

	return result;
};

module.exports = function(name, protocol) {
	protocol = protocol || 'tcp';
	var range = available(protocol);
	var index = hash(name, range.length);

	return range[index];
};
