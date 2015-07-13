(function () {
    var map = new BMap.Map(document.createElement('div'));
    function autocomplete(eleId, callback) {
        var myValue; // 这是输入框中的值

        var ls = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: function () {
                var coords = ls.getResults().getPoi(0).point;
                callback(coords);  // 搜索完成，回调
            }
        });

        //建立一个自动完成的对象
        var ac = new BMap.Autocomplete(
            {
                "input": eleId,
                "location": map
            });

        ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;

        });

        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            ls.search(myValue);
        });
    }

    window.BMap = window.BMap || {};
    BMap.Convertor = {};
    BMap.Convertor.autocomplete = autocomplete;
})();