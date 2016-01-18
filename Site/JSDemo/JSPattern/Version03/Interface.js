// construcotr.

var Interface = function (name, methods) {
    if (arguments.length !== 2) {
        throw new Error('Interface constructor call with ' +
            arguments.length + 'arguments, but exceptd exactly 2.');
    }

    this.name = name;
    this.methods = [];

    for (var i = 0; i < methods.length; i++) {
        if (typeof (methods[i]) !== 'string') {
            throw new Error('Interface constructor expects method names to be passed in a string.');
        }
        this.methods.push(methods[i]);
    }
};

// static method

Interface.ensureImplements = function (object) {
    var i,
        j,
        len,
        methodsLen,
        method,
        interface;

    if (arguments.length < 2) {
        throw new Error('Function Interface.ensureImplements called with ' + arguments.length +
            ' arguments, but expected at least 2.');
    }

    // 第2个参数后为接口
    for (i = 1, len = arguments.length; i < len; i++) {
        interface = arguments[i];

        if (interface.constructor !== Interface) {
            throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface.');
        }

        for (j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            method = interface.methods[j];
            if (!object[method] || typeof (object[method]) !== 'function') {
                throw new Error('Function Interface.ensureImplements: object does not implement the ' +
                    interface.name + ' interface. Method ' +
                    method + ' was not found.');
            }
        }
    }
};