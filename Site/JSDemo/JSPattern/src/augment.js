window.ZLib = window.ZLib || {};

ZLib.augment = function (receivingClass, givingClass) {
    // 扩展 prototype
    // 如果传递了大于2个参数，就表示扩展自定的方法

    var methodName = '';

    if (arguments[2]) {

        for (var i = 2, len = arguments.length; i <= len; i++) {
            methodName = arguments[i];
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }

    } else {  // 扩展所有的方法

        for (methodName in givingClass.prototype) {
            // 如果已经存在，则跳过
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }


    }
};