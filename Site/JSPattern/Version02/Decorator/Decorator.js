/* ListBuilder class. */

var ListBuilder = function (parent, listLength) {
    this.parentEl = $(parent);
    this.listLength = listLength;
};

ListBuilder.prototype = {
    buildList: function () {
        var list = document.createElement('ol');
        this.parentEl.appendChild(list);

        for (var i = 0; i < this.listLength; i++) {
            var item = document.createElement('li');
            list.appendChild(item);
        }
    }
};

/* SimpleProfilter class. */

var SimpleProfiler = function (component) {
    this.component = component;
};

SimpleProfiler.prototype = {
    buildList: function () {
        var startTime = new Date();
        this.component.buildList();
        var elapsedTime = (new Date()).getTime() - startTime().getTime();
        console.log('buildList:' + elapsedTime + 'ms');
    }
};

/* MethodProfiler class. */

var MethodProfiler = function (component) {
    this.component = component;
    this.timers = {};

    for (var key in this.component) {

        // 首先判断元素为函数
        if (typeof this.component[key] !== 'function' || !this.component.hasOwnProperty[key]) {
            continue;
        }

        // 然后在判断是否为原型函数


        var that = this;
        (function (methodName) {
            that[methodName] = function () {
                that.startTimer(methodName);
                var returnValue = that.component[methodName]
                    .apply(that.component, arguments);
                that.displayTime(methodName, that.getElapsedTime(methodName));
                return returnValue;
            };
        })(key);
    }

};

MethodProfiler.prototype = {
    startTimer: function (methodName) {
        this.timers[methodName] = (new Date()).getTime();
    },
    getElapsed: function (methodName) {
        return (new Date()).getTime() - this.timers[methodName];
    },
    displayTime: function (methodName, time) {
        console.log(methodName + ': ' + time + 'ms');
    }
};

var KKKing = function (component) {
    this.component = component;
    this.timers = {};

    // 遍历对象中的每一个属性
    for (var key in this.component) {
        // 必须为方法，且为原型方法
        if (typeof this.component[key] !== 'function') {
            continue;
        }

        // 对每个方法进行装饰
        // 由于在 for 循环中，此次需要消除闭包的影响
        var that = this;
        (function (methodName) {
            that[methodName] = function () {
                that.startTimer();
                var returnValue = this.component[methodName].apply(this.component, arguments);
                that.endTimer();
                return returnValue;
            }
        })(key);  // 消除闭包的影响
    }
};

KKKing.prototype = {
    startTimer: function (methodName) {
        this.timers[methodName] = new Date().getTime();
    },
    endTimer: function (methodName) {
        console.log('Elapsed Time : ' + new Date().getTime() - this.timers[methodName]);
    }
};