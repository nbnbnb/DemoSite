var Anim = function () { };
Anim.prototype = {
    start: function () { },
    end: function () { }
};


var baz = (function () {
    var foo = 10;
    var bar = 20;
    return function () {
        return foo * bar;
    };

})();