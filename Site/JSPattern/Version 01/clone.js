/* Clone function. */

function clone(object) {
    function F() { }
    // 由此可以体会到Javascript设计者的用意
    // prototype属性就是用来指向原型对象的，通过原型链机制，它提供了到所有继承而来的成员的链接
    F.prototype = object;

    // 函数所返回的结果是一个以给定对象为原型对象的空对象
    return new F();
}