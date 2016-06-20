/// <reference path="jquery-1.4.1-vsdoc.js" />
/*
* 公共类 UnitCommon
* 功能
* 1，接口实现与检测 -> UnitCommon.Interface
* 2，为类添加继承 -> UnitCommon.Helper.extend
*/

// 确认不会覆写掉已经存在的对象
window.UnitCommon = window.UnitCommon || {};
UnitCommon.Helper = UnitCommon.Helper || {};

/*************************** UnitCommon.Interface Begin ******************************************/

///	<summary>
///		定义一个接口类，包含接口名称和定义的方法
///     (只能传递两个参数)
///	</summary>
///	<param name="name" type="String">
///     接口的名称
///	</param>
///	<param name="methods" type="Array">
///		接口中需要包含的类
///	</param>
///	<returns type="Object" />
UnitCommon.Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw new Error("只能传递两个参数");
    }

    // 检测方法名称是否合适 (必须要为字符串)
    // 由于传递过来的对象为数组，所以可以用下面的方法来进行检测
    // 如果不合规范，则抛出错误
    for (var index in methods) {  // index = 0,1,2,3...,n
        if (typeof methods[index] !== 'string') {
            throw new Error('methods 参数传递格式不正确，必须为字符串数组');
        }
    }

    // 接口的名称
    this.name = name;

    // 此处新建一个对象，以避免外部对象修改时对此对象的影响
    this.methods = methods.concat();  // 使用 concat() 方法复制数组

};

///	<summary>
///		检测对象中是否实现了此接口
///     (传递至少一个接口对象，以检测是否实现了多个接口)
///     静态公共方法
///	</summary>
///	<param name="object" type="Object">
///     需要检测的对象
///	</param>
UnitCommon.Interface.implementMethods = function (object) {

    // 首先检测是否传入了正确的参数个数
    if (arguments.length < 2) {
        throw new Error("传入的参数个数不正确");
    }

    // 第一个参数默认为需要检测的对象，后面的参数为Interface类的实例
    // 判断传入的 Interface类的实例 是否合法
    for (var i = 1; i < arguments.length; i++) {
        var face = arguments[i];
        if (!face instanceof UnitCommon.Interface) {
            throw new Error("对象不是Encapsulate.Interface类型");
        }

        // 如果以上没有错误抛出，这查看对象中是否包含接口中指定的方法
        // 检测每一个接口中的方法，是否被此对象包含
        for (var j = 0; j < face.methods.length; j++) {
            var methodName = face.methods[j];

            // 如果对象不包含此接口中指定名称的方法
            // 或
            // 此方法不为函数对象
            // 则抛出异常
            if (!object[methodName] || typeof object[methodName] != 'function') {
                // 此处可以指定出接口名称和方法名称，易于查找异常
                throw new Error("对象没有实现 " + face.name + " 接口中" + methodName + "的方法");
            }
        }
    }
};
/*************************** UnitCommon.Interface End ******************************************/

/*************************** UnitCommon.Helper.extend Begin(类式继承)******************************************/
// 使一个类继承另一个类
UnitCommon.Helper.extend = function (subClass, superClass) {
    // 避免实例化父类的开销，此处创建一个临时的对象
    var F = function () { };
    F.prototype = superClass.prototype;
    subClass.prototype = new F();

    // 设置子类正确的 constructor 属性
    subClass.prototype.constructor = subClass;

    // 给子类添加一个 superClass 属性，用于保存其父类对象
    subClass.superClass = superClass;

    // 确保超类 prototype 的 constructor 即使为 Object,也保证其会被正确的设置
    if (superClass.prototype.constructor === Object) {
        superClass.prototype.constructor = superClass;
    }
};
/*************************** UnitCommon.Helper.extend End(类式继承)******************************************/

/*************************** UnitCommon.Helper.clone Begin(原型式继承)******************************************/
UnitCommon.Helper.clone = function (object) {
    function F() { }

    // 此处可以体会到Javascript设计者最初的用意
    // prototype属性就是用来指向原型对象的，
    // 通过原型链接机制,它提供了到所有继承而来的成员的链接
    F.prototype = object;

    return new F();
};
/*************************** UnitCommon.Helper.clone End(原型式继承)******************************************/

/*************************** UnitCommon.Helper.augment Begin(掺元类帮助方法)******************************************/
UnitCommon.Helper.augment = function (receivingClass, givingClass) {
    // 此处有一点需要注意
    // 需要判断 receivingClass 是 原型类 还是 传统类
    // 原型类没有 prototype 属性(prototype属性只有在函数对象才存在)

    var receive = receivingClass.prototype ? receivingClass.prototype : receivingClass;

    // 一个帮助方法
    var appendMethod = function (methodName) {
        if (!receive[methodName]) {  // 若存在则不覆写
            receive[methodName] = givingClass.prototype[methodName];
        }
    };

    if (arguments.length > 2) {  // 按照 传递的 自定义的方法名 进行扩展        
        for (var i = 2; i < arguments.length; i++) {
            appendMethod(arguments[i]);
        }
    } else {  // 扩展全部的方法                
        for (var methodName in givingClass.prototype) {
            appendMethod(methodName);
        }
    }
};
/*************************** UnitCommon.Helper.augment End(掺元类帮助方法)******************************************/
