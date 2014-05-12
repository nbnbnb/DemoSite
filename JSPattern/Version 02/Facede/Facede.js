function setStyle(elements, prop, val) {
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].style[prop] = val;
    }
}

function setCSS(elements, styles) {
    for (var name in styles) {
        if (!styles.hasOwnProperty(name)) {
            continue;
        }
        setStyle(elements, name, styles[name]);
    }
}

DED.util.Event = {
    getEvent: function (e) {
        return e || window.event;
    },
    getTarget: function (e) {
        return e.target || e.srcElement;
    },
    stopPropagation: function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
    preventDefault: function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    stopEvent: function (e) {
        this.stopPropagation(e);
        this.preventDefault(e);
    }
};

var handleReadyState = function (http, callback) {
    var pool = setInterval(function () {
        if (http && http.readyState == 4) {
            clearInterval(pool);
            if (callback) {
                callback(http);
            }
        }
    }, 50);
};