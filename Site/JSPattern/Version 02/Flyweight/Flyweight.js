/* CalendarItem Interface. */

var CalendarYear = new Inerface('CalendarYear', ['display']);

/* CalendarYear class, a Composite. */

var CalendarYear = function (year, parent) {
    this.year = year;
    this.element = document.createElement('div');
    this.element.style.display = 'none';
    parent.appendChild(this.element);

    function isLeapYear(y) {
        return (y > 0) && !(y % 4) && ((y % 100) || !(y % 400));
    }

    this.months = [];

    this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30, 31, 30, 31, 31,
        30, 31, 30, 31];
    for (var i = 0, len = 12; i < len; i++) {
        this.months[i] = new CalendarMonth(i, this.numDays[i], this.element);
    }

};

CalendarYear.prototype = {
    display: function () {
        for (var i = 0, len = this.months.length; i < len; i++) {
            this.months[i].display();
        }
        this.element.style.display = 'block';
    }
};

var CalendarMonth = function (monthNum, numDays, parent) {
    this.monthNum = monthNum;
    this.element = document.createElement('div');
    this.element.style.display = 'none';
    parent.appendChild(this.element);

    this.days = [];

    for(var i=0,len=numDays;i<len;i++){
        this.days[i] = calendarDay;
    }
};

CalendarMonth.prototype = {
    display: function () {
        for (var i = 0, len = this.days.length; i < len; i++) {
            this.days[i].display(i, this.element);
        }
        this.element.style.display = 'block';
    }
};

var CalendarDay = function () { }

CalendarDay.prototype = {
    display: function (date, parent) {
        var element = document.createElement('div');
        param.appendChild(element);
        element.innerHTML = this.date;
    }
};

var calendarDay = new CalendarDay();

var TooltipManager = (function () {



    /* Tooltip class. un-optimized */
    var Tooltip = function () {
        this.delayTimeout = null;
        this.delay = 1500; // in milliseconds.

        this.element = document.createElement('div');
        this.element.style.display = 'none';
        this.element.style.position = 'absolute';
        this.element.className = 'tooltip';
        document.getElementsByName('body')[0].appendChild(this.element);

    };

    Tooltip.prototype = {
        startDelay: function (e, text) {
            if (this.delayTimeout == null) {
                var that = this;
                var x = e.clientX;
                var y = e.clientY;
                this.delayTimeout = setTimeout(function () {
                    that.show(x, y, text);
                }, this.delay);
            }
        },
        show: function (x, y, text) {
            clearTimeout(this.delayTimeout);
            this.delayTimeout = null;
            this.element.innerHTML = text;
            this.element.style.left = x + 'px';
            this.element.style.top = y + 'px';
            this.element.style.display = 'block';
        },
        hide: function () {
            clearTimeout(this.delayTimeout);
            this.delayTimeout = null;
            this.element.style.display = 'none';
        }
    };

    var storedInstance = new Tooltip();

    return {
        addTooltip: function (targetElement, text) {
            var tt = this.getTooltip();
            addEvent(targetElement, 'mouseover', function (e) { storedInstance.startDelay(e, text); });
            addEvent(targetElement, 'mouseout', function (e) { storedInstance.hide(); });
        }
    };

})();

/* DisplayModule Interface. */
var DisplayModule = new Interface('DisplayModule', ['show', 'hide', 'state']);

/* DialogBox class. */
var DialogBox = function () {  // implements DisplayModule

};

DialogBox.prototype = {
    show: function (header, body, footer) {

    },
    hide: function () {

    },
    state: function () {

    }
};

/* DialogBoxManager singleton. */

var DialogBoxManager = (function () {
    var created = [];

    return {
        displayDialogBox: function (header,body,footer) {
            var inUse = this.numberInUse();
            // 只有在不能重用现有实例的情况下才创建实例
            if (inUse > created.length) {
                created.push(this.createDialogBox());
            }
            // 返回一个可用的实例
            created[inUse].show(header, body, footer);
        },
        createDialogBox: function () {
            var db = new DialogBox();
            return db;
        },
        numberInUse: function () {
            var inUse = 0;
            for (var i = 0, len = created.length; i < len; i++) {
                if (created[i].state() === 'visiable') {
                    inUse++;
                }
            }
            return inUse;
        }
    };
})();