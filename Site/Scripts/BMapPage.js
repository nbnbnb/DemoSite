window.BMapPage = window.BMapPage || {};
window.BMapHelper = window.BMapHelper || {};

window.BMapHelper.createMap = function (id) {
    return new BMap.Map(id);
};

window.BMapHelper.addZoomInOutControl = function (left, right, map) {
    //左上角，缩放按钮
    var top_right_navigation =
        new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL });
    top_right_navigation.setOffset(new BMap.Size(left, right));
    map.addControl(top_right_navigation);
};

window.BMapHelper.createPoint = function (x, y) {
    return new BMap.Point(x, y);
};

window.BMapHelper.doSearch = function (start_point, end_point, lineType, map, options) {
    BMap.Convertor.translate(start_point, 0, function (start) {
        BMap.Convertor.translate(end_point, 2, function (end) {
            map.clearOverlays();
            new lineType(map, options).search({ title: '你当前的位置', point: start },
                { title: '目的地', point: end });
        });
    });
};

window.BMapHelper.doMark = function (point, coorType, content, map) {
    BMap.Convertor.translate(point, coorType, function (res_point) {
        var count = 0,
            label = new BMap.Label(content, { offset: new BMap.Size(20, -10) }),
            marker = new BMap.Marker(res_point, { title: '测试标点' }),
            // 设置跳动动画
            timerId = setInterval(function () {
                count++;
                marker.setOffset(new BMap.Size(0, count % 2 === 0 ? 3 : -3)); // 上下3个位移
                if (count === 6) {  // 跳动 6 次
                    clearInterval(timerId);
                }
            }, 200);

        map.clearOverlays();
        map.centerAndZoom(res_point, 25);

        label.setStyle({ border: 'none', fontSize: '14px' });
        marker.setLabel(label);
        map.addOverlay(marker);
    });
};

BMapPage._initCoor = function (begin_lng, begin_lat, end_lng, end_lat) {
    this._begin_lng = begin_lng;
    this._begin_lat = begin_lat;
    this._end_lng = end_lng;
    this._end_lat = end_lat;
};

BMapPage._initMap = function () {
    this._map = window.BMapHelper.createMap("allmap");
    window.BMapHelper.addZoomInOutControl(30, 10, this._map);

    // 如果能进入这个页面表示可以获得设备的经纬度
    this._start_point = window.BMapHelper.createPoint(this._begin_lng, this._begin_lat); // 硬件坐标【0】
    this._end_point = window.BMapHelper.createPoint(this._end_lng, this._end_lat);  // Google 地图坐标【2】

    this._map.enableScrollWheelZoom(true);
    this._map.centerAndZoom(this._start_point, 15);
};

BMapPage.TextViewInit = function (begin_lng, begin_lat, end_lng, end_lat, hotelName, minute,
    mile, lineType, isWarp, memberId) {

    this._initCoor(begin_lng, begin_lat, end_lng, end_lat);
    this._initMap();

    var self = this;

    var walkAndDriveSearchComplete = function (result) {
        var route = result.getPlan(0).getRoute(0);  // 返回第一个方案的第一条线路
        model.details.removeAll();
        for (var i = 0, len = route.getNumSteps() ; i < len ; i++) {
            model.details.push("<b>" + (i + 1) + "</b>. " + route.getStep(i).getDescription(false));
        }
    };

    var busSearchComplete = function (result) {
        model.details.removeAll();
        for (var i = 0, len = result.getNumPlans() ; i < len; i++) {
            model.details.push("<b>" + (i + 1) + "</b>. " + result.getPlan(i).getDescription(false));
        }
    };

    var walk_drive_options = {
        renderOptions: {
            map: self._map,
            autoViewport: true
        },
        onSearchComplete: walkAndDriveSearchComplete
    };

    var bus_options = {
        renderOptions: {
            map: self._map,
            autoViewport: true
        },
        onSearchComplete: busSearchComplete
    };

    var searchWalkLine = function () {
        new BMap.WalkingRoute(self._map, walk_drive_options).search(self._start_point, self._end_point);
    };

    var searchBusLine = function () {
        new BMap.TransitRoute(self._map, bus_options).search(self._start_point, self._end_point);
    };

    var searchDriveLine = function () {
        new BMap.DrivingRoute(self._map, walk_drive_options).search(self._start_point, self._end_point);
    };

    var searchMapping = {
        "步行": searchWalkLine,
        "公交": searchBusLine,
        "驾车": searchDriveLine
    };

    searchMapping[lineType]();

    var MyModel = function () {

        this.isWarp = isWarp;
        this.lineType = lineType;
        this.hotelName = hotelName;
        this.minute = minute;
        this.mile = mile;
        this.details = ko.observableArray(['加载数据中...']);
        this.goPicView = function () {
            //history.back();
            var params = {
                begin_lng: begin_lng,
                begin_lat: begin_lat,
                end_lng: end_lng,
                end_lat: end_lat,
                hotelName: hotelName,
                lineType: lineType,
                memberId: memberId
            };
            window.location = "MapPicView.aspx?" + $.param(params);
        };
    };

    var model = new MyModel();
    ko.applyBindings(model);
};

BMapPage.PicViewInit = function (begin_lng, begin_lat, end_lng, end_lat, hotelName, isWarp, memberId) {

    this._initCoor(begin_lng, begin_lat, end_lng, end_lat);
    this._initMap();

    var self = this,
        isAssist = false, // 当没有合适路线时，自动分配驾车路线
        searchComplete = function (results) {
            if (!isAssist && results.getNumPlans() === 0) {
                model.showStat(false);
                isAssist = true;
                $('span[class=drive]').click();
                alert('无法找到合适步行线路，为您选择驾车方式');
                return;
            };

            isAssist = false;
            var plan = results.getPlan(0);
            model.mile(plan.getDistance(true));
            model.minute(plan.getDuration(true));
            model.showStat(true);
        },
        options = {
            renderOptions: {
                map: self._map,
                autoViewport: true
            },
            onSearchComplete: searchComplete
        },

        doSearch = function (lineType) {
            window.BMapHelper.doSearch(self._start_point, self._end_point, lineType, self._map, options);
        },
        doMarker = function (point, coorType, content) {
            window.BMapHelper.doMark(point, coorType, confirm, self._map);
        },
        MyViewModel = function () {
            this.selectedIndex = ko.observable();
            this.showStat = ko.observable(false);
            this.minute = ko.observable();
            this.mile = ko.observable();
            this.isWarp = isWarp;
            this.walk = function () {
                this.selectedIndex(1);
                doSearch(BMap.WalkingRoute);
            };
            this.bus = function () {
                this.selectedIndex(2);
                doSearch(BMap.TransitRoute);
            };
            this.drive = function () {
                this.selectedIndex(3);
                doSearch(BMap.DrivingRoute);
            };
            this.locateStart = function () {
                doMarker(self._start_point, 0, '当前位置');
            };
            this.locateEnd = function () {
                doMarker(self._end_point, 2, hotelName);
            };
            this.goTextView = function () {
                var params = {
                    minute: this.minute(),
                    mile: this.mile(),
                    begin_lng: begin_lng,
                    begin_lat: begin_lat,
                    end_lng: end_lng,
                    end_lat: end_lat,
                    hotelName: hotelName,
                    memberId: memberId
                },
                lineType = this.selectedIndex() === 1 ? "步行" : this.selectedIndex() === 2 ? "公交" : "驾车";
                window.location = "MapTextView.aspx?" + $.param(params) + "&lineType=" + lineType;
            };
        },

        model = new MyViewModel();

    // Model Bind
    ko.applyBindings(new MyViewModel());
};

$(function () {
    var url = decodeURI(location.href.toString()),  // 中文需要解码   
        types = ['驾车', '公交', '步行'],
        selectors = ['drive', 'bus border', 'walk border'],
        trigger = function (index) {
            setTimeout(function () {
                $('span[class="' + selectors[index] + '"]').click();
            }, 100);
        };

    if (url.indexOf('lineTpye') < 0) {// 默认加载时选择步行
        trigger(2);
    } else {
        _.forEach(types, function (ele, index, list) {
            if (url.indexOf('lineType=' + ele) > 0) {
                trigger(index);
            }
        });
    }
});