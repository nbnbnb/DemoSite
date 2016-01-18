/* Directory interface. */

var Directory = new Interfact('Directory', ['showPage']);

/* PersonnelDirectory class, the Real Subject */
var PersonnalDirectory = function (parent) {  // implement Directory
    this.xhrHandler = XhrManager.createHxrHandler();
    this.parent = parent;
    this.data = null;
    this.currentPage = null;

    var that = this;

    var callback = {
        success: that._configure,
        failure: function () {
            throw new Error('PersonnelDirectory: failure in data retrival.');
        }
    };

    xhrHandler.request('GET', 'data.php', callback);
};

PersonnalDirectory.prototype = {
    _configure: function (responseText) {
        this.data = eval('(' + responseText + ')');

        this.currentPage = 'a';
    },
    showPage: function (page) {
        $('page-' + this.currentPage).style.display = 'none';
        $('page-' + page).style.display = 'block';
        this.currentPage = page;
    }
};

/* DirectoryProxy class, just the outline. */

var DirectoryProxy = function (parent) {  // implements Directory
    this.directory = null;
    this.parent = parent;
    this.warning = null;
    this.initialized = false;
    var that = this;
    addEvent(parent, 'mouseover', that._initialize);  // Initialization trigger.
};

DirectoryProxy.prototype = {
    _initialize: function () {
        this.warning = document.createElement('div');
        this.parent.appendChild(this.warning);
        this.warning.innerHTML = 'The compand directory is loading....';
        this.directory = new PersonnalDirectory(this.parent);
        var that = this;
        this.interval = setInterval(function () { that._checkInitialization(); }, 100);
    },
    showPage: function (page) {
        if (!this.initialized) {
            return;
        }
        this.directory.showPage(page);
    },
    _checkInitialization: function () {
        if (this.directory.currentPage != null) {
            clearInterval(this.interval);
            this.initialized = true;
            this.parent.removeChild(this.warning);
        }
    }
};

/* DynamicProxy abstract class, incomplete. */

var DynamicProxy = function () {
    this.args = arguments;
    this.initialized = false;
    
    if (typeof this.class !== 'function') {
        throw new Error('DynamicProxy: the class attribute must be set before' +
            ' calling the super-class constructor.');
    }

    for (var key in this.class.prototype) {
        // Ensure that the property is a function
        if (typeof this.class.prototype[key] !== 'function') {
            continue;
        }
        // Add the method
        var that = this;
        (function (methodName) {
            that[methodName] = function () {
                if (!that.initialized) {
                    return;
                }
                return this.subject[methodName].apply(that.subject, arguments);
            };
        })(key);
    }
};

DynamicProxy.prototype = {
    _initialize: function () {
        this.subject = {};  // Instantiate the class.
        this.class.apply(this.subject, this.args);
        this.subject.__proto__ = this.class.prototype;

        var that = this;
        this.interval = setInterval(function () { that._checkInitialization(); }, 100);
    },
    _checkInitialization: function () {
        if (this._isInitialized()) {
            clearInterval(this.interval);
            this.initialized = true;
        }
    },
    _isInitialized: function () {
        throw new Error('Unsupported operation on an abstract class.');
    }
};

/* TestProxy class. */

var TestProxy = function () {
    this.class = TestClass;
    var that = this;
    addEvent($('#test-link'), 'click', function () { that._initialize(); });

    // Initialization trigger
    TestProxy.superclass.constructor.apply(this, arguments);
};

extend(TestProxy, DynamicProxy);

TestProxy.prototype._isInitialized = function () {
    // Initialization condition goes here.
};