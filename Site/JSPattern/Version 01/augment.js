/* Augment functin. */

function augment(receivingClass, givingClass) {
    if (arguments.length > 2) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            if (givingClass.prototype[arguments[i]]) {
                receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
            }
        }
    } else {
        for (var methodName in givingClass.prototype) {
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}