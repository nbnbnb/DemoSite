(function () {

    var inputEle, map, resEle, cb;

    $(function () {
        $('body').on('click', 'div[id^=divid]', function () {
            selectResult(parseInt($(this).attr('index'), 10));
        });

        $('body').on('mouseover', 'div[id^=divid]', function () { this.style.background = '#CAE1FF'; });

        $('body').on('mouseout', 'div[id^=divid]', function () { this.style.background = ''; });
    });

    function autocomplete(inputId, resId, callback) {
        inputEle = document.getElementById(inputId);
        resEle = document.getElementById(resId);
        cb = callback;
        //地图加载
        map = new AMap.Map("mapContainer", {
            resizeEnable: true,
            view: new AMap.View2D({
                center: new AMap.LngLat(116.397428, 39.90923),//地图中心点
                zoom: 13 //地图显示的缩放级别
            }),
            keyboardEnable: false
        });
        inputEle.onkeyup = keydown;
    }

    //输入提示
    function autoSearch() {
        var keywords = inputEle.value;
        var auto;
        //加载输入提示插件
        map.plugin(["AMap.Autocomplete"], function () {
            var autoOptions = {
                city: "" //城市，默认全国
            };
            auto = new AMap.Autocomplete(autoOptions);
            //查询成功时返回查询结果
            if (keywords.length > 0) {
                AMap.event.addListener(auto, "complete", autocomplete_CallBack);
                auto.search(keywords);
            }
            else {
                resEle.style.display = "none";
            }
        });
    }

    function autocomplete_CallBack(data) {
        var resultStr = "";
        var tipArr = data.tips;
        //var len=tipArr.length;
        if (tipArr && tipArr.length > 0) {
            for (var i = 0; i < tipArr.length; i++) {
                resultStr += "<div id='divid" + (i + 1) + "'"
                            + " index=" + i + " "
                            + " style=\"font-size: 13px;cursor:pointer;padding:5px 5px 5px 5px;\" " +
                            "data=" + tipArr[i].adcode + ">" + tipArr[i].name + "<span style='color:#C1C1C1;'>" + tipArr[i].district + "</span></div>";
            }
        }
        else {
            resultStr = " π__π 亲,人家找不到结果!<br />要不试试：<br />1.请确保所有字词拼写正确<br />2.尝试不同的关键字<br />3.尝试更宽泛的关键字";
        }

        resEle.curSelect = -1;
        resEle.tipArr = tipArr;
        resEle.innerHTML = resultStr;
        resEle.style.display = "block";
    }

    function focus_callback() {
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            inputEle.onpropertychange = autoSearch;
        }
    }

    function keydown(event) {
        var key = (event || window.event).keyCode;
        var result = resEle;
        var cur = result.curSelect;
        if (key === 40) {//down key
            if (cur + 1 < result.childNodes.length) {
                if (result.childNodes[cur]) {
                    result.childNodes[cur].style.background = '';
                }
                result.curSelect = cur + 1;
                result.childNodes[cur + 1].style.background = '#CAE1FF';
                inputEle.value = result.tipArr[cur + 1].name;
            }
        } else if (key === 38) {//up key
            if (cur - 1 >= 0) {
                if (result.childNodes[cur]) {
                    result.childNodes[cur].style.background = '';
                }
                result.curSelect = cur - 1;
                result.childNodes[cur - 1].style.background = '#CAE1FF';
                inputEle.value = result.tipArr[cur - 1].name;
            }
        } else if (key === 13) {
            if (resEle && resEle['curSelect'] !== -1) {
                selectResult(resEle.curSelect);
            }
        } else {
            autoSearch();
        }
    }

    //输出关键字查询结果的回调函数
    function placeSearch_CallBack(data) {
        //清空地图上的InfoWindow和Marker
        windowsArr = [];
        marker = [];
        map.clearMap();
        var resultStr1 = "";
        var poiArr = data.poiList.pois;
        var resultCount = poiArr.length;

        if (poiArr.length) {
            cb(poiArr[0].location.getLng(), poiArr[0].location.getLat())
        }
    }

    //选择输入提示关键字
    function selectResult(index) {
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            inputEle.onpropertychange = null;
            inputEle.onfocus = focus_callback;
        }
        //截取输入提示的关键字部分
        var text = document.getElementById("divid" + (index + 1)).innerHTML.replace(/<[^>].*?>.*<\/[^>].*?>/g, "");
        var cityCode = document.getElementById("divid" + (index + 1)).getAttribute('data');
        inputEle.value = text;
        resEle.style.display = "none";

        //根据选择的输入提示关键字查询
        map.plugin(["AMap.PlaceSearch"], function () {
            var msearch = new AMap.PlaceSearch();  //构造地点查询类
            AMap.event.addListener(msearch, "complete", placeSearch_CallBack); //查询成功时的回调函数
            msearch.setCity(cityCode);
            msearch.search(text);  //关键字查询查询
        });
    }

    window.AMap = window.AMap || {};
    AMap.Convertor = {};
    AMap.Convertor.autocomplete = autocomplete;
})();

