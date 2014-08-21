/// <reference path="jquery-1.4.1-vsdoc.js" />
/// <reference path="json2.js" />
jQuery.myHelper = {};  // 添加一个自定义的命名空间，以免冲突
jQuery.myHelper.getWebMthod = function (sUrl, sMethodName, oParameter, fnSuccess) {
    ///    <summary>
    ///        通过jQuery的ajax来调用 后台方法(必须为public static ,并标记[WebMethod])
    ///    </summary>
    ///    <param name="sUrl" type="String">页面Url(以aspx结尾，可以绝对，也也可相对路径)</param>
    ///    <param name="sMethodName" type="String">后台方法名称(不需要带参数，如SayHello)</param>
    ///    <param name="oParameter" type="Object">需要传递给后台方法的参数json对象(注意：对象名称区分大小写)</param>
    ///    <param name="fnSuccess" type="Function">回调函数(方法签名 oData(json对象),结果都封装在oData.d中)</param>
    ///    <returns type="Object" >返回一个json对象(值都包含在参数的d对象中，如msg.d)</returns>
    jQuery.ajax({
        type: "POST",
        url: sUrl + "/" + sMethodName,
        data: JSON.stringify(oParameter),  // 使用 JSON2 库，将json对象转换为 标准的 json 字符串 
        contentType: "application/json;charaset=uft-8",
        dataType: "json",
        success: fnSuccess
    });
};

var handler = {
    message: "Event handled",
    handleClick: function () {
        alert(this.message);
        alert(arguments[0]);
    }
};

// 函数绑定
// 返回一个在给定环境中调用给定函数的函数
// 注意这里使用的arguments对象是内部函数的，而非 funcBind的
function bind(fn, context) {
    return function () {  
        fn.apply(context, arguments);
    };
}

// 函数柯里化
// 用于创建已经设置好了一个或多个参数的函数(用于创建函数)
// 基本创建方法
// 调用另一个函数，并为它传入要柯里化的函数和必要的参数
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);  // 第一个参数为函数对象，去掉
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finnalArgs = args.concat(innerArgs);
        return fn.apply(null, finnalArgs);
    };
}

// Yielding Process
function chunk(arr, process, context) {
    setTimeout(function () {
        process.call(context, arr.shift());
        if (arr.length > 0) {
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}

// 函数节流
var process = {
    timeoutId: null,

    // 实际进行处理的方法
    performProcessing: function () {

    },

    // 初始处理调用时执行的方法

    process: function () {
        // 首选取消以存储在队列中的 执行代码的 timeoutId
        // 如果此段代码已近执行了，则此处无影响
        // 如果此段代码没有执行，又触发了此次的代码执行
        // 则取消前次的代码
        clearTimeout(this.timeoutId);

        // 需求保存当前的作用域
        var that = this;

        // 保存timeoutId
        this.timeoutId = setTimeout(function () {  // setTimeout 函数中的环境总是 window,所有有必要保存this 的引用以方便以后使用
            that.performProcessing();  // 通过保存的作用域来调用其中的方法
        }, 1000);

    }
};

// 函数节流，用 throttle 函数来简化
// 在method 函数对象上附加一个 tId,用来表示一个执行队列中的代码
function throttle(method, context) {
    
    // 首先是清除 (第一时没有)
    clearTimeout(method.tId);

    method.tId = setTimeout(function () {
        method.call(context);  // 调用方法，指定环境
    }, 1000);
}

// 自定义事件
function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    // 由于使用对象赋值的方式指定原型会丢失对原始 constructor 的引用
    // 如果不指定，此处的constructor 将指向 Object
    // 此处重新赋值
    constructor: EventTarget,

    // 使用一个对象来保存所有订阅的事件
    // 包含事件类型和对于订阅的函数
    handlers:{},

    // 传递事件的类型和触发此事件时的处理函数
    addHandler: function (type, handler) {

        // 此事件还未订阅
        if (typeof this.handlers[type] === "undefined") {
            // 用一个数组来保存订阅此事件的函数
            this.handlers[type] = [];
        }

        // 将此类事件的函数加入对象中
        this.handlers[type].push(handler);
    },

    // 触发事件
    // 
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var subHandlers = this.handlers[event.type];
            for (var i = 0, len = subHandlers.length; i < len; i++) {
                subHandlers[i](event);
            }
        }
    },

    removeHandler: function (type, handler) {
        var subHandlers=this.handlers[type];
        if (subHandlers instanceof Array) {
            for (var i = 0, len = subHandlers.length; i < len; i++) {
                if (subHandlers[i] === handler) {
                    break;
                }
            }

            // 注意此处是如何删除对象的
            // 此方法不错
            // 由于javascript特殊作用域的原因
            // 此处可以读取 i ~~
            subHandlers.splice(i, 1);
        }
    }
};

// 