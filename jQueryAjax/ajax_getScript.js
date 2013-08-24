/// <reference path="/Scripts/jquery-1.4.1-vsdoc.js" />

// 此代码将会直接加载到window作用域中

jQuery.sayHello = function () {
    alert("Hello World!--->" + new Date().getTime());
};

var timeStamp = new Date().getTime();