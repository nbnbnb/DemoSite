﻿/* Mixin Class */

var Mixin = function () { }
Mixin.prototype = {
    serialize: function () {
        var output = [];
        for (var key in this) {
            output.push(key + ": " + this[key]);
        }
        return output.join(', ');
    }
};