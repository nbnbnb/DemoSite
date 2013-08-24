window.ZLib = window.ZLib || {};

/* Extend Function */

ZLib.extend = function (subClass, superClass) {
    if (arguments.length !== 2) {
        throw new Error('必须传递两个参数，第一个参数为子类，第二个参数为基类');
    }
    // 使用一个空函数F,并将用它创建一个对象实例，插入原型链中
    // 这样做可以避免创建超类的实例，因为它可能会比较大，而且有时超类的构造函数有一些付作用
    // 或者会执行一些需要进行大量计算的任务。

    // 注意，此处为什么没有直接设置 为 
    // subClass.prototype=superClass.prototype
    // 因为prototype属性是一个引用对象，如果这样设置了，将会造成两个构造函数指向同一个对象(prototype属性)
    // 对一个构造函数的prototype属性改变，会影响另一个，从而产生副作用。
    // 此处使用了一个空函数对此情景进行了隔离,同时也保证了正确的原型链调用。

    var F = function () { };
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;

    // 确保超类的 prototype的constructor属性已被正确设置
    // 因为超类的prototype属性有可能是用字面量对象进行设置的(所以其constructor属性为Object)
    // Object===Object.prototype.constructor
    // 然而没有显式进行设置为正确的 构造函数
    if (superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
};