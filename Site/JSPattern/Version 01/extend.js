function extend(subClass, superClass) {

    // 用它创建一个对象实例插入到原型链中
    // 这样做可以避免创建超类的新实例，因为它可能比较大
    // 而且有时超类的构造函数有一些副作用或者会执行一些需要进行大量计算的任务
    var F = function () { }

    F.prototype = superClass.prototype;

    // 此处设置子类的prototype属性
    // 此处仅仅只是关联了原型链
    // 当在子类的prototype中无法找打方法或属性时，原型链 F 的 prototype中进行查找

    // 注意，此处为什么不设置为 subClass.prototype=superClass.prototype
    // 因为prototype是Object类型，按引用传递的，如果这样设置，那么对子类的prototype的改变，同时会影响到父类，而这不是我们期望的
    // 此处通过创建一个空的实例，就避免了子类与父类引用同一个prototype对象，当时通过原型链，还是保持了关联 （当父类中添加新方法时，子类通过原型链还是可以读取到）
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    // 有了superclass属性，可以直接访问超类中的方法
    // 这在即要重定义超类中的某个方法，而又想访问超类中的某个实现时，可以派上用场
    subClass.superclass = superClass.prototype;
    // 确保超类的constructor属性已被正确的设置，即使超类就是Object类本身
    if (superClass.prototype.constructor === Object) {
        superClass.prototype.constructor = superClass;
    }
}