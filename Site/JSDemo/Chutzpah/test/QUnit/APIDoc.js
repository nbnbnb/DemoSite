module('Assert API');

test('deepEqual', function () {
    // 可以比较的类型为 元素类型，数组，对象，正则表达式，日期和函数类型
    var obj = { foo: 'bar' };
    deepEqual(obj, { foo: 'bar' }, 'Two objects can be the same in value');

    // 对比下面两个测试，可以得出 deepEqual中对每个比较执行的是 strictEqual
    //deepEqual('1', 1, 'String one and Number one are not deepEqual');
    notDeepEqual('1', 1, 'String one and Number one are not strictDeepEqual');
    equal('1', 1, 'String one and Number one are equal');
});

test('notDeepEqual', function () {
    // 为 deepEqual 的取反
    // 对 对象内部执行的 strictEqual 
    notDeepEqual('1', 1, '字符串1和数值1不相等');
    // 对于基本类型，与下面的比较方法一致
    notStrictEqual('1', 1, '字符串1和数值1不相等');
});

test('equal', function () {
    equal(1, '1', '字符串1和数字1相等');
    equal(undefined, null, 'undefined与null相等');
    equal('', 0, '空字符串和数字0相等');
    equal(false, 0, '布尔值false和0相等');

    notEqual('', null, '空字符串和null不相等');
    notEqual('', undefined, '空字符串和undefined不相等');
    notEqual(false, null, '布尔值false和null不相等');
    notEqual(false, undefined, '布尔值false和undefined不相等');
    notEqual('true', true, '字符串true和布尔true不相等');

    notEqual(NaN, NaN, 'NaN与NaN不相等(其实与任何对象都不相等,也包括自己)');

});

test('notEqual', function () {
    // 为 equal 的取反
    notEqual(NaN, NaN, 'NaN与NaN不相等(其实与任何对象都不相等,也包括自己)');
});

test('notStrictEqual', function () {
    // 严格的比较对象相等性  ===
    notStrictEqual('1', 1, '字符串1和数字1不相等');
});

test('ok', function () {
    ok(!null, 'null为假');
    ok(!'', '空字符串为假');
    ok(!undefined, 'undefined为假');
    ok(!false, 'false为假');
    ok(!NaN, 'NaN为假');
    ok(!0, '数字0为假');

    ok({}, '空对象为真');
    ok(' ', '空格为真');
    ok('0', '字符串0为真');
    ok(function () { }, '函数对象为真');
    ok(true, 'true为真');
});

test('throws', function () {

    var CustomError=function(message){this.message=message;};
    CustomError.prototype.toString = function () { return this.message };

    var AnotherError = function (message) { this.message = message; };

    throws(function () { throw 'error'; }, '抛出字符串异常，非异常对象');

    // 指定抛出的异常对象类型
    throws(function () { throw new CustomError('触发了CustomError'); }, CustomError, '函数抛出了CustomError异常');

    // 抛出的异常对象不是期望的 【测试无法通过】
    //throws(function () { throw new AnotherError('触发了AnotherError') }, CustomError, '函数抛出了AnotherError异常');

    // 注意，此处使用 /description/ 正则表达式 用来获得函数的异常
    // 此时，将会把异常信息抛出到测试页面中 【测试无法通过】
    //throws(function () { throw new CustomError('触发了CustomError'); }, /description/, '函数抛出了CustomError异常');
});

module('Async Control');

asyncTest('asyncTest', function () {
    // 保证在此函数中要执行一次 assert(两次都不行)
    // 也可以在 asyncTest的第二个参数中指定,如 asyncTest('asyncTest', 1,function (){});
    expect(1);

    // 模拟异步操作
    setTimeout(function () {

        ok(true, '延时触发!');

        // Start running tests again after the testrunner was stopped
        start();

    }, 1000);

});

// 注意，此处使用的是 test ，而不是 asyncTest
test('start and stop', function () {
    // Stop the testrunner to wait for async tests to run
    // 测试组件等待异步操作执行完成(处于线程停止状态)
    // 异步操作执行完成的标志就是调用 start()方法

    // 对于 start和stop方法，都有 一个方法重载参数，用来表示各自调用了多少次
    // 反正就是调用了多少次 stop() , 就要调用多少次 start()
    // start() 与 start(1) 一致
    stop(2);
    setTimeout(function () {
        // Start running tests again after the testrunner was stopped
        ok(true, '延时触发!');

        setTimeout(function () {

            ok(true, '第二此触发延迟!');

            start(1);
        }, 500);

        start(1);

    }, 1000);
});