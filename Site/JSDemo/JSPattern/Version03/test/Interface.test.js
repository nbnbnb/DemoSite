/// <reference path="//code.jquery.com/qunit/qunit-1.17.1.js" />
/// <reference path="../Interface.js" />

module('Interface 接口测试')

test('检测对象实现了接口', function () {
    // Arrange
    var personInterface = new Interface('Person', ['sayName', 'showAge', 'run']);
    var Person = function (name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.sayName = function () {
        console.log(this.name);
    };
    Person.prototype.showAge = function () {
        console.log(this.age);
    };
    Person.prototype.run = function () {
        console.log('Running....');
    };

    // Act
    var zhangjin = new Person('张进', 28);
    Interface.ensureImplements(zhangjin, personInterface);

    // Assert
    ok(true, '对象实现了指定的接口方法');
});

test('检测对象未实现接口', function () {
    // Arrange
    var personInterface = new Interface('Person', ['sayName', 'showAge', 'run', 'swimming']);
    var Person = function (name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.sayName = function () {
        console.log(this.name);
    };
    Person.prototype.showAge = function () {
        console.log(this.age);
    };
    Person.prototype.run = function () {
        console.log('Running....');
    };

    // Act
    var zhangjin = new Person('张进', 28);


    // Assert
    throws(function () { Interface.ensureImplements(zhangjin, personInterface); },
        Error,
        '对象未实现了指定的接口方法');

});