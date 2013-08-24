module('extend 函数测试(让子类继承父类)');

test('使用 extend 函数，让子类继承父类', function () {
    // Assert
    var A = function (name) {
        this.name = name;
    };

    A.prototype = {
        getName: function () {
            return this.name;
        }
    };

    var B = function (name, age) {
        // 此处调用超类的构造函数时
        // 是通过超类的 prototype属性 的 constructor属性来获得正确的构造函数
        // 从而可以弱化与父类之间的耦合。
        B.superclass.constructor.call(this, name);
        this.age = age;
    };

    // 需要两个参数
    // B类为子类，A类为父类

    throws(function () { extend() }, '传递参数个数不正确');
    throws(function () { extend(B) }, '传递参数个数不正确');

    // Act
    ZLib.extend(B, A);

    // 通过 superclass 属性直接调用超类中的方法
    // 由于子在extend方法中，对B的prototype属性进行了重新赋值
    // 所以此处新添加的原型方法，一定要放在 extend方法之后
    B.prototype.getName = function () {
        var name = this.constructor.superclass.getName.call(this);
        return name + '[child]';
    };

    var b = new B('zhangjin', 26);

    // Assert
    equal(b.name, 'zhangjin','获取属性正确');
    equal(b.age, 26, '获取属性正确');
    equal(b.getName(), 'zhangjin[child]', '通过继承方法获取属性正确');
    equal(b.constructor, B, '构造函数正确');
    equal(B.superclass, A.prototype, '子类superclass属性表示父类构造函数的prototype属性');
    equal(A, A.prototype.constructor, '父类的构造函数被正确的设置了');

    ok(b instanceof A, '判断对象类型正确(基类)');
    ok(b instanceof B, '判断对象类型正确(子类)');
});
