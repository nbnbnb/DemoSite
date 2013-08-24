window.Person = window.Person || (function () {

    // 私有静态属性/方法
    var showName = function (name) {
        alert(this.name);
    }

    var consts = { 'A': 1, 'B': 2 };

    // 构造函数
    var ctor = function (name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.showName = showName;
        this.keys = consts;
    };

    return ctor;

})();

