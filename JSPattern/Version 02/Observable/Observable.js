function Publisher() {
    this.subscribers = [];
}

Publisher.prototype.deliver = function (data) {
    this.subscribers.forEach(function (fn) {
        fn(data);
    });
    return this;
};

Function.prototype.subscribe = function (publisher) {
    var that = this;
    var alreadyExists = publisher.subscribers.some(
            function (el) {
                return el === that;
            }
        );
    if (!alreadyExists) {
        publisher.subscribers.push(this);
    }
    return this;
};

Function.prototype.unsubscribe = function (publisher) {
    var that = this;
    publisher.subscribers = publisher.subscribers.filter(
        function (el) {
            return el !== that;
        }
     );
    return this;
};

var publisherObject = new Publisher();

var observerObject = function (data) {
    console.log(data);
    arguments.callee.unsubscribe(publisherObject);
};

observerObject.subscribe(publisherObject);

var Animation = function (o) {
    this.onStart = new Publisher();
    this.onComplete = new Publisher();
    this.OnTween = new Publisher();
};

Function.prototype.method = function (name, fn) {
    this.prototype[name] = fn;
    return this;
};

Animation.method('fly', function () {
    this.onStart.deliver();
    this.onTweek.deliver();
    this.onComplete.deliver();
});

var Superman = new Animation({});

var putOnCape = function () { };
var takeOffCape = function () { };

putOnCape.subscribe(Superman.onStart);
takeOffCape.subscribe(Superman.onComplete);

Superman.fly();
