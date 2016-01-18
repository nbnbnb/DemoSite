/// <reference path="../../src/clone.js" />

module('原型继承 ZLib.clone 函数测试');

test('原型链继承 clone函数', function () {
    // Arrange
    var a = {
        name: 'zhangjin',
        age: 26,
        createAddress: function () {
            // 对于复杂属性
            // 使用工厂函数进行创建
            return {
                city: 'wuhan',
                country: 'china'
            }
        }
    };

    // Act
    var b = ZLib.clone(a);
    var address = b.createAddress();

    // Assert
    equal(b.name, 'zhangjin');
    equal(b.age, 26);
    equal(address.city, 'wuhan');
    equal(address.country, 'china');

    b.name = '张进';
    notEqual(a.name, b.name);

    notEqual(a.createAddress(), address);

    deepEqual(a.createAddress(), address);

    address.city = '武汉';
    notDeepEqual(a.createAddress(), address);

});
