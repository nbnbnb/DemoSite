module('Interface 接口测试');

test('正确创建实例', function () {

    // Arrange
    var originMethods = ['foo', 'baz', 'tar'];
    var inf = new ZLib.Interface('demo', originMethods);

    // Act
    var name = inf.name;
    var methods = inf.methods;

    // Assert
    ok(!!inf, '实例化接口对象');
    equal(name, 'demo', '设置 name 字段');
    deepEqual(methods, originMethods, '设置 methods 方法列表');
});

test('错误创建实例', function () {
    // Act
    throws(function () { new ZLib.Interface(123); }, Error, '传递参数个数不正确，抛出异常');

    throws(function () { new ZLib.Interface(123, ['foo', 'bar', 123]); }, '传递参数类型不正确，抛出异常');
});

test('接口检测方法', function () {

    var p1 = {};
    var infError = {};

    throws(function () { ZLib.Interface.ensureImplements(p1); }, '未传递正确的检测参数[需要至少两个参数]');
    throws(function () { ZLib.Interface.ensureImplements(p1, infError); }, '未传递正确的检测参数[从第二个参赛起，必须为ZLib.Interface对象的实例]');

});

test('正确实现接口中的方法', function () {

    var IPeople = new ZLib.Interface('IPeople', ['run', 'speak', 'sleep']);
    var ISport = new ZLib.Interface('ISport', ['football', 'basketball']);
    var People = function () {
    };

    People.prototype = {
        run: function () { },
        speak: function () { },
        sleep: function () { },
        football: function () { },
        basketball: function () { }
    };

    var p1 = new People();
    var p2 = {
        run: function () { },
        speak: function () { },
        sleep: function () { }
    };
    var p3 = {
        football: function () { },
        basketball: function () { }
    };

    ZLib.Interface.ensureImplements(p1, IPeople, ISport);
    ZLib.Interface.ensureImplements(p2, IPeople);
    ZLib.Interface.ensureImplements(p3, ISport);

    ok(true, '实现接口方法成功');

});

test('错误实现接口中的方法', function () {

    var IPeople = new ZLib.Interface('IPeople', ['run', 'speak', 'sleep']);
    var ISport = new ZLib.Interface('ISport', ['football', 'basketball']);
    var People = function () {
    };

    People.prototype = {
        run1: function () { },  // diff
        speak: function () { },
        sleep: function () { },
        football1: function () { }, // diff
        basketball: function () { }
    };

    var p1 = new People();

    throws(function () { ZLib.Interface.ensureImplements(p1, IPeople); }, '未实现指定的接口');

    throws(function () { ZLib.Interface.ensureImplements(p1, ISport); }, '未实现指定的接口');

});
