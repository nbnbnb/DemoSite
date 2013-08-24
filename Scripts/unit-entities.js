/// <reference path="unit-common.js" />

/*
*   实体类
*   可以使用原型继承或类继承
*/

// 确认不会覆写掉已近存在的对象
window.UnitEntities = window.UnitEntities || {};

/*************************** UnitEntities Begin ******************************************/

/*************************** UnitEntities.Person Begin  **********************/
UnitEntities.Person = (function () {
    
    // 私有静态函数

    // 检查是否为空字符串
    var checkEmpty = function (value) {
        if (typeof value !== 'string') {   // 类型不正确
            throw new Error('参数不合法！');
        }
        else { //  是否为空
            if (value.replace(/(^\s*)|(\s*$)/g, '') === '') {
                throw new Error("属性值不能设置为空");
            }
        }
    };

    // 私有静态属性

    var birthday = new Date("1987/12/12");

    // 创建一个计数器，判断对象被实例化了多少次
    var initTimes = 0;

    // 常量
    // 常量也当做私有静态属性进行处理，只有取值，而没有赋值
    var constants = {
        COUNTRY: "China",
        CITY: "WuHan"
    };

    // 类的构造
    var ctor = function (name, age, address) {

        // 私有属性
        var _name;
        var _age;
        var _address;

        // 私有方法
        var getBirthday = function () {
            return birthday;
        };

        // 公共方法
        // 特权方法(可以在对象外访问私有属性)
        // 通过getXXX,setXXX来访问私有属性
        // name property
        this.getName = function () {
            return _name;
        };
        this.setName = function (newName) {
            checkEmpty(newName);
            _name = newName;
        };
        // age property
        this.getAge = function () {
            return _age;
        };
        this.setAge = function (newAge) {
            _age = newAge;
        };
        // address property
        this.getAddress = function () {
            return _address;
        };
        this.setAddress = function (newAddress) {
            checkEmpty(newAddress);
            _address = newAddress;
        };

        // 公有方法
        // 返回一个包含用户信息的对象
        this.getUserInfo = function () {
            return {
                name: this.getName(),
                address: this.getAddress(),
                birthday: getBirthday()  // 这是一个私有方法
            };
        };

        // 为了便于获得常量，提供一个方法来进行检索
        // 提供常量名，返回常量值
        this.getConstant = function (name) {
            return constants[name];
        };

        this.getInitTimes=function(){
            return initTimes;
        }

        // 通过构造参数，设置默认值

        // constructor
        this.setName(name);
        this.setAddress(address);
        this.setAge(age);

        // 可以把计算器当做一个公有的静态属性，不过无法阻止用户对其更改
        UnitEntities.Person.initTimes += 1; // 计数器
        // 将其定义为一个私有的静态变量不错，实例通过特权方法来进行访问
        initTimes += 1;
    };

    // 返回
    return ctor;
})();

// 公共实例方法
// 所有的类都共享
// 类似于.NET 中的扩展方法
// 貌似就是一个语法糖，作用域为一个实例对象，替换其中的this即可
// 可以访问对象的实例方法
// 不能访问私有变量

UnitEntities.Person.prototype = {
    // 保留 原始的constructor 
    constructor: UnitEntities.Person,
    
    // 扩展方法(公共的)
    // 所有的实例才可以访问
    sayName: function () {
        alert(this.getName());
    }
};

// 公共静态方法
// 不可以访问对象的实例方法
UnitEntities.Person.formatAddress = function () {
    return "";
}

// 公共静态属性
// 可以任意进行改写，不安全
// 此处用initTimes表示对象被实例化了多少次
// 更好的方法是使用私有静态属性
UnitEntities.Person.initTimes = 0;

/*************************** UnitEntities.Person End **********************/

/*************************** UnitEntities.Author Begin **********************/
// 继承 UnitEntities.Person 类
UnitEntities.Author = (function () {

    // 常量

    // 静态私有方法

    // 静态私有属性

    var ctor = function (name, age, address, books) {

        // 调用父类的构造函数，将this 作为作用域传递过去
        UnitEntities.Author.superclass.call(this, name, age, address);

        // 私有属性
        var _books;

        // 公共方法
        this.getBooks = function () {
            return _books;
        };
        this.setBooks = function (books) {
            _books = books;
        };

        // 设置属性值
        this.setBooks(books);
    };

    return ctor;
})();

// 使用一个帮助方法，使一个类继承自另一个类
UnitCommon.Helper.extend(UnitEntities.Author, UnitEntities.Person);

UnitEntities.Author.prototype.getBooks = function () {
    return this.books;
};

/*************************** UnitEntities.Author End **********************/

/*************************** UnitEntities.ProtoTypePerson Begin **********************/
// 看看用原型继承是如何设计类的
// 使用原型继承时，并不需要用类来定义对象的结构，只需要创建一个对象即可
// 这个对象随后可以被新的对象重用，这得益于原型链查找的工作机制
// 方法的默认值一般不会改变，而属性的默认值一般都会改变
UnitEntities.ProtoTypePerson = {
    name: 'default name',
    age: 0,
    sayName: function () {
        alert(this.name);
    },
    getAddress: function () {  // 对于引用类型，使用一个方法来创建，比较好
        return {
            country: 'china',
            province: 'hubei',
            city: 'wuhan'
        };
    }
};
/*************************** UnitEntities.ProtoTypePerson End **********************/

/*************************** UnitEntities.ProtoTypeAuthor Begin **********************/
// 看看 ProtoTypeAuthor对象是如何继承ProtoTypePerson对象的
// 一个帮助方法 clone 搞定
UnitEntities.ProtoTypeAuthor = UnitCommon.Helper.clone(UnitEntities.ProtoTypePerson);
// 然后可以添加ProtoTypeAuthor对象去其他属性
// 对于引用类型，以函数返回比较好
UnitEntities.ProtoTypeAuthor.getBooks = function () { return [];}

/*************************** UnitEntities.ProtoTypeAuthor End **********************/

/*************************** UnitEntities.Mixin Begin **********************/
// 定义一个掺元类
// 先创建一个包含各种通用方法的类，然后在用它扩展其它类
UnitEntities.Mixin = function () { };
UnitEntities.Mixin.prototype = {
    serialize: function () {
        var output = [];
        for (var key in this) {
            output.push(key + ':' + this[key]);
        }
        return output.join(',');
    }
};

/*************************** UnitEntities.Mixin End **********************/