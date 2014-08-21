var DemoSite = window.DemoSite || {};
DemoSite.JSTemp = DemoSite.JSTemp || (function () {

    // 私用变量
    var version = '0.1.1';
    
    // 返回单体对象
    return {
        name: 'JSTemp Page',
        sayName: function () {
            alert(DemoSite.JSTemp.name);
        }
    };

})();