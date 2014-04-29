/// <reference path="../../src/code.js" />

QUnit.config.urlConfig.push(
    {
        id: 'stringLib',
        label: 'stringLib',
        tooltip: 'Just stringLib'
    }
);

test("A basic test", function () {
    ok(true, "this test is fine");
    var value = "hello";
    equal("hello", value, "We expect value to be hello");
});

module("stringLib");

test("will get vowel count", function () {
    var count = stringLib.vowels("hello");

    equal(count, 2, "We expect 2 vowels in hello");
});

module("mathLib");

test("will add 5 to number", function () {
    var res = mathLib.add5(10)

    equal(res, 15, "should add 5");
});

test("will multiply 5 to number", function () {
    var res = mathLib.mult5(10)

    equal(res, 50, "should multiply by 5");
});

module('cookbook');

test('ok test', function () {
    ok(true, 'true succeeds');
    ok('non-empty', 'non-empty stirng succeeds');

    ok(!false, 'false fails');
    ok(!0, '0 fails');
    ok(!NaN, 'NaN fails');
    ok(!'', 'empty string fails');
    ok(!null, 'null fails');
    ok(!undefined, 'undefined fails');
});

test('equal test', function () {
    equal(0, 0, 'Zero; equal succeeds');
    equal('', 0, 'Empty, Zero; equal succeeds');
    // 空字符串和0是相等的【非严格模式下】
    equal(' ', 0, 'Empty String, Zero; equal succeeds');
    equal('', '', 'Empty, Empty; equal succeeds');
    equal(0, 0, 'Zero, Zero; equal succeeds');

    notEqual('three', 3, 'Three, 3; equal fails');
    notEqual(null, false, 'null, false; equal fails');

    // equal 使用的是 == 而 strictEqual 使用的是  ===
    notStrictEqual(0, '', 'Zero, Empty; strict equal fails');
});

test('deepEqual test', function () {
    var obj = { foo: "bar" };

    deepEqual(obj, { foo: "bar" }, 'Two object can be the same in value');
});

asyncTest('asynchronous test: one second later!', 2, function () {
    //expect(2);
    setTimeout(function () {
        ok(true, 'Pass and ready to resume!');
        equal(1, '1', '1 and "1" are equal');
        // 当执行完成后，需要调用 start() 方法
        start();
    }, 1000);
});

test('global pollution', function () {
    window.pollute = true;
    ok(pollute, 'nasty pollution');
});

module('module setup teardown', {
    setup: function () {
        ok(true, 'one extra assert per test');
    },
    teardown: function () {
        ok(true, 'and one extra assert after each test');
    }
});

test('test with setup and teardown', function () {
    expect(2);
});
