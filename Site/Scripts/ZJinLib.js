
/*************************** ZJinLib Begin(创建一个自定义Javascript库,类似与jQuery链式调用)******************************************/

// 使用一个帮助方法，方便的为原型链添加方法
// 不建议直接在prototype对象上直接添加方法
Function.prototype.method = function (name, fn) {
    this.prototype[name] = fn;
    return this;  // 为了支持链式调用，放回此函数对象 ZJin
};

(function () {
    // 私用方法
    // 构造函数，创建所有的dom对象，保存在 this.elements中
    // 注意，在闭包中，永远不要用arguments
    // arguments在闭包中，不是代表的传入当前闭包的函数参数
    var ZJin = function (eles) {
        // 用于保存所有的  dom 原始
        this.elements = [];

        // id 的个数
        var len = eles.length;

        //根据构造参数，获取dom元素，并保存起来
        if (eles < 1) {
            throw new Error('需要传入dom id');
        }

        for (var i = 0; i < len; i++) {
            var id = eles[i];
            if (typeof id === 'string') {  // 格式正确
                var domEle = document.getElementById(id);

                if (domEle) {   //  查找到了此DOM元素
                    // 添加到 this.elements对象中
                    this.elements.push(domEle);
                }
            }
        }
    }

    // 添加原型方法，链式调用
    // 使用了附加在 Function.prototype上的帮助方法 method(name,fn)
    // 注意每个方法后都需要返回一个this
    // 这种写法真酷！
    ZJin.method("each", function (fn) {   // 遍历每一个DOM对象，并执行一个指定的回调
        for (var i = 0; i < this.elements.length; i++) {
            // 注意，要将函数对象的作用域设置正确
            // 函数的参数签名为一个DOM对象
            fn.call(this, this.elements[i]);
        }
        return this;  // 此处返回的是 ZJin的实例对象
    })
    .method("setStyle", function (prop, val) {
        this.each(function (ele) {
            ele.style[prop] = val;
        });
        return this;
    })
    .method("show", function () {
        this.setStyle('display', 'block');
        return this;
    })
    .method("big", function (size) {
        this.each(function (ele) {
            // 由于获取对象的大小方法比较麻烦
            // 此处使用jQuery 帮助方法
            jQuery(ele).width($(ele).width() + size);
            jQuery(ele).height($(ele).height() + size);
        });
        return this;
    });

    return window.ZJinLib = window.ZJinLib || function () {
        // 传递构造参数,这个参数arguments属于最外层那个函数的，闭包中是无法使用这个对象的
        return new ZJin(arguments);  
    };
})();

// 调用示例： ZJinLib('div_message', 'p_info').setStyle('backgroundColor', 'red').show().big(10);  

/*************************** ZJinLib End(创建一个自定义Javascript库)******************************************/