window.ZLib = window.ZLib || {};

ZLib.clone = function (obj) {
    var F = function () { };
    F.prototype = obj;
    return new F();
};