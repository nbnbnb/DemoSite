﻿var asyncRequest = (function () {

    function handleReadyState(xhr, callback) {
        var poll = window.setInterval(function () {
            if (xhr && xhr.readyState == 4) {
                window.clearInterval(poll);
                if (callback) {
                    callback(xhr);
                }
            }
        }, 50);
    }

    // 注意，在函数中对象的重写功能
    var getXHR = function () {
        var http;
        try {
            http = new XMLHttpRequest();
            getXHR = function () {
                return new XMLHttpRequest();
            };
        } catch (e) {
            var msxml = [
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];
            for (var i = 0, len = msxml.length; i < len; ++i) {
                try {
                    http = new ActiveXObject(msxml[i]);
                    getXHR = function () {
                        return new ActiveXObject(msxml[i]);
                    };
                    break;
                } catch (e) {

                }
            }
        }
        return http;
    };

    return function (method, uri, callback, postData) {
        var http = getXHR();
        http.open(method, uri, true);
        handleReadyState(http, callback);
        http.send(postData || null);

        return http;
    };

})();

Function.prototype.method = function (name, fn) {
    this.prototype[name] = fn;
    return this;
};

if (!Array.prototype.forEach) {
    Array.method('forEach', function (fn, thisObj) {
        var scope = thisObj || window;
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    });
}

if (!Array.prototype.filter) {
    Array.method('filter', function (fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for (var i = 0, len = this.length; i < len; ++i) {
            if (!fn.call(scope, this[i], i, this)) {
                continue;
            }
            a.push(this[i]);
        }
        return a;
    })
}

window.DED = window.DED || {};

DED.util = DED.util || {};

DED.util.Observer = function () {
    this.fns = [];
};

DED.util.Observer.prototype = {
    subscribe: function (fn) {
        this.fns.push(fn);
    },
    unsubscribe: function (fn) {
        this.fns = this.fns.filter(function (el) {
            // 过滤掉相等的
            return el !== fn;
        });
    },
    fire: function (o) {
        this.fns.forEach(function (el) {
            el(o);
        });
    }
};

DED.Queue = function () {
    this.queue = [];

    this.onComplete = new DED.util.Observer();
    this.onFailure = new DED.util.Observer();
    this.onFlush = new DED.util.Observer();

    this.retryCount = 3;
    this.currentRetry = 0;
    this.paused = false;
    this.timeout = 5000;
    this.conn = {}; // 保存的是一个 XHR 对象
    this.timer = {};
};

DED.Queue
    .method('flush', function () {
        if (!this.queue.length > 0) {
            return;
        }
        if (this.paused) {  // 如果队列的状态为暂停，则返回
            this.paused = false;   // 设置为非暂停状态【连续两次调用 pause 时，第二次将会触发 flush】
            return;
        }
        var that = this;
        this.currentRetry++;


        var abort = function () {
            that.conn.abort();
            // 检查是否达到指定的重试次数
            if (that.currentRetry == that.retryCount) {
                that.onFailure.fire();  // 触发错误回调
                that.currentRetry = 0;
            } else {
                that.flush();  // 未达到重试次数，再试一次
            }
        };
        // 超时，将会执行abort函数
        this.timer = window.setTimeout(abort, this.timeout);

        var callback = function (o) {
            window.clearTimeout(that.timer); // 清除延时发生时的计时器
            that.currentRetry = 0;
            // 执行回调成功后，弹出一个元素
            that.queue.shift();
            that.onFlush.fire(o.responseText);
            if (that.queue.length == 0) {
                that.onComplete.fire();
                return;
            }
            that.flush();
        };

        // conn 是一个 xhr 对象
        this.conn = asyncRequest(
                this.queue[0]['method'],
                this.queue[0]['uri'],
                callback,  // 指定回调函数【如果在指定的时间内，回调函数没有执行，则会执行abort函数】
                this.queue[0]['params']
            );
    })
    .method('setRetryCount', function (count) {
        this.retryCount = count;
    })
    .method('setTimeout', function (time) {
        this.timeout = time;
    })
    .method('add', function (o) {
        this.queue.push(o);
    })
    .method('pause', function () {
        this.paused = true;
    })
    .method('dequeue', function () {
        this.queue.pop();
    })
    .method('clear', function () {
        this.queue = [];
    });
