(function () {
    // Use a private class.
    function _$(els) {
        this.elements = [];
        for (var i = 0, len = els.length; i < len; i++) {
            var element = els[i];
            if (typeof element === 'string') {  // 传递的为对象的id ，而非 dom 对象
                element = document.getElementById(element);
            }
            this.elements.push(element);
        }
    }

    _$.prototype = {
        each: function (fn) {
            for (var i = 0, len = this.elements.length; i < len; i++) {
                fn.call(this, this.elements[i]);
            }
            return this;
        },
        setStyle: function (prop, val) {
            this.each(function (el) {
                el.style[prop] = val;
            });
            return this;
        },
        show: function () {
            var that = this;
            this.each(function (el) {
                that.setStyle('display', 'block');
            });

            return this;
        },
        addEvent: function (type, fn) {

            this.each(function (el) {
                if (window.addEventListener) {
                    el.addEventListener(type, fn, false);
                } else if (window.attachEvent) {
                    el.attachEvent('on' + type, fn);
                }
            });
            return this;
        }

    };

    window.installHelper = function (scope, interface) {
        scope[interface] = function () {
            return new _$(arguments);
        };
    };

})();