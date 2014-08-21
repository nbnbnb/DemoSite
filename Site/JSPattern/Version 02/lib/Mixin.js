window.Maxin = window.Maxin || (function () {
    window.Maxin = function () { };
    Maxin.prototype = {
        serialize: function () {
            var output = [];
            for (var key in this) {
                output.push(key + ': ' + this[key]);
            }
            return output.join(', ');
        }
    };
}());
