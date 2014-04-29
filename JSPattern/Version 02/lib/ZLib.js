window.ZLib = window.ZLib || {
    // 类式继承
    extend: function (subClass, superClass) {
        var F = function () { }
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;

        subClass.superclass = superClass.prototype;

        // 保证超类的构造函数已被正确的设置
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    },
    // 原型继承
    clone: function (obj) {
        var F = function () { }
        F.prototype = obj;
        return new F();
    },
    // 掺元方法
    augment: function (receivingClass, givingClass) {

        // 如果传递了指定的方法，只掺元指定的方法
        if (arguments[2]) {
            for (var i = 2; i < arguments.length; i++) {
                receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
            }
        } else {
            for (var methodName in givingClass.prototype) {
                if (!receivingClass.prototype[methodName]) {
                    receivingClass.prototype[methodName] = givingClass.prototype[methodName];
                }
            }
        }
    }
};
