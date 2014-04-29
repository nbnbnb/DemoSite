/// <reference path="../../src/augment.js" />

module('ZLib.augment 参元方法测试');

test('扩展全部方法', function () {
    var Serialize = function () { };

    // 模拟对象序列化
    Serialize.prototype.serialize = function () {
        var output = [];
        var type = '';
        for (var key in this) {
            // 仅仅序列化 string 和 number
            type = typeof this[key];
            if (type === 'string' || type === 'number') {
                output.push(key + ':' + this[key]);
            }
        }
        return output.join(',');
    };

    Serialize.prototype.getTitle = function () {
        return 'Do Serialize';
    };

    var Person = function (name, age) {
        this.name = name;
        this.age = age;
    };

    ZLib.augment(Person, Serialize);

    var p = new Person('zhangjin', 26);

    equal(p.serialize(), 'name:zhangjin,age:26');
    equal(p.getTitle(), 'Do Serialize');
});

test('扩展部分方法/属性', function () {
    var Person = function () { };

    Person.prototype.getName = function () {
        return 'default name';
    };
    Person.prototype.address = 'wuhan';
    Person.prototype.country = 'china';


    Person.prototype.getCountry = function () {
        return this.country;
    };

    var ZhangJin = function () { };

    ZLib.augment(ZhangJin, Person, 'getName', 'country');

    var zj=new ZhangJin();

    equal(zj.country, 'china');
    equal(zj.getName(), 'default name');
    equal(zj.address, undefined);  // 没有扩展此属性
    equal(zj.getCountry, undefined);  // 没有扩展此方法
});

test('扩展多个对象', function () {
    var Say = function () { };
    Say.prototype.say = function () {
        return 'I am say';
    };

    var Run = function () { };
    Run.prototype.run = function () {
        return 'I am run';
    };

    var Person = function () { };
    var p = new Person();

    ZLib.augment(Person, Say);

    equal(p.say(), 'I am say');
    equal(p.run, undefined);

    // 再扩展一个
    ZLib.augment(Person,Run);
    equal(p.run(), 'I am run');
});

test('不扩展已存在的原型对象', function () {

    var Person = function () { };
    Person.prototype.name = 'default name';
    Person.prototype.age = 0;
    Person.prototype.getType = function () {
        return 'Person';
    };

    var ZhangJin = function () { };
    ZhangJin.prototype.age = 26;
    ZhangJin.prototype.getType = function () {
        return 'ZhangJin';
    };

    var Dashan = function () { };
    Dashan.prototype.name = 'dashan';

    ZLib.augment(ZhangJin, Person);
    ZLib.augment(Dashan, Person, 'name');  // 只扩展name

    var zj = new ZhangJin();
    var dashan = new Dashan();

    equal(zj.age, 26);  //  使用只身的
    equal(zj.name, 'default name');  // 使用扩展的
    equal(zj.getType(), 'ZhangJin');  //  使用只身的

    equal(dashan.name, 'dashan');
    equal(dashan.age, undefined);
    equal(dashan.getType, undefined);
});