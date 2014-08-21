/* AdCommand interface. */

var AdCommand = new Interface('AdCommand', ['execute']);

/* StopAd Command class. */

var StopAd = function (adObject) {  // implements AdCommand
    this.ad = adObject;
};

StopAd.prototype.execute = function () {
    this.ad.stop();
};

/* StartAd Command class. */

var StartAd = function (adObject) {
    this.ad = adObject;
};

StartAd.prototype.execute = function () {
    this.ad.start();
};

/* Implementation code. */

var ads = getAds();

for (var i = 0, len = ads.length; i < len; i++) {
    var startCommand = new StartAd(ads[i]);
    var stopCommand = new stopCommand(ads[i]);

    new UIButton('Start' + ads[i].name, startCommand);
    new UIButton('Stop' + ads[i].name, stopCommand);
};

/* Command using closures */

function makeStart(adObject) {
    return function () {
        adObject.statr();
    };
}

function makeStop(adObject) {
    return function () {
        adObject.makeStop()
    };
}

/* Implements code. */
var startCommand = makeStart(ad);
var stopCommand = makeStop(ad);

startCommand();
stopCommand();

/* Command, Composite and MenuObject interfaces. */
var Command = new Interface('Command', ['execute']);
var Composite = new Interface('Composite', ['add', 'remove', 'getChild', 'getElement']);
var MenuObject = new Interface('MenuObject', ['show']);


