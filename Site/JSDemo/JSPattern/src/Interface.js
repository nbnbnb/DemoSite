window.ZLib = window.ZLib || {};

// 接口类
ZLib.Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw new Error('构造函数需要2个参数，实际传递' + arguments.length + '个');
    }
    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error('方法名称必须为字符串类型');
        }
        this.methods.push(methods[i]);
    }
};

// 静态方法
// 用于判断一个对象是否实现了接口中的方法
// 第一个参数为需要检测的对象
// 后面的参数为 Interface实例对象，用于判断检测的对象是否实现了它们中定义的方法
ZLib.Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error('需要至少传递两个参数');
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var inf = arguments[i];
        if (inf.constructor !== ZLib.Interface) {
            throw new Error('传递参数类型错误，必须为 Interface 类型实例');
        }
        for (var j = 0, methodsLen = inf.methods.length; j < methodsLen; j++) {
            var method = inf.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error('对象未实现' + inf.name + '接口中的方法 [' + method + ']');
            }
        }
    }
};