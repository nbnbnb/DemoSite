(function () {
    function _$(eles) {
        this.elements = [];

        var i, len, element;
        for (i = 0, len = eles.length; i < len; i++) {
            element = eles[i];
            if (typeof eles[i] === 'string') {
                element = document.getElementById(eles[i]);
            }
            this.elements.push(element);
        }
    }

    _$.prototype = {
        each: function (fn) {
            var i, len;
            for (i = 0, len = this.elements.length; i < len; i++) {
                fn.call(this, this.elements[i]);
            }
            return this;
        },
        setStyle: function (prop, val) {
            return this.each(function (ele) {
                ele.style[prop] = val;
            });
            return this;
        },
        show: function () {
            return this.setStyle('display', 'inline');
        },
        hide: function () {
            return this.setStyle('display', 'none');
        }
    }

    window.$ = function () {
        return new _$(arguments);
    };
})();