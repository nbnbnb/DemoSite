window.BMapPage = window.BMapPage || {};
window.BMapHelper = window.BMapHelper || {};

BMapHelper.createMap = function (id) {
    return new BMap.Map(id);
};

BMapHelper.addZoomInOutControl = function (left, right, map) {
    //左上角，缩放按钮
    var top_right_navigation =
        new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL });
    top_right_navigation.setOffset(new BMap.Size(left, right));
    map.addControl(top_right_navigation);
};

BMapHelper.createPoint = function (x, y) {
    return new BMap.Point(x, y);
};

BMapHelper.doMark = function (point, coorType, content, map) {
    BMap.Convertor.translate(point, coorType, function (res_point) {
        var count = 0,
            label = new BMap.Label(content, { offset: new BMap.Size(20, -10) }), // 标签位置
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

BMapHelper.createOption = function (map, callback) {
    return {
        renderOptions: {
            map: map,
            autoViewport: true
        },
        onSearchComplete: callback
    };
};

BMapHelper.lineSearch = function (config, map, start_point, end_point) {
    new config.type(map, BMapHelper.createOption(map, config.callback)).search(start_point, end_point);
};

BMapPage.ViewInit = function (view, eleId, begin_lng, begin_lat, end_lng, end_lat) {
    view.map = BMapHelper.createMap(eleId);
    view.start_point = BMapHelper.createPoint(begin_lng, begin_lat); // 硬件坐标【0】
    view.end_point = BMapHelper.createPoint(end_lng, end_lat);  // Google 地图坐标【2】
    view.map.centerAndZoom(view.start_point, 15);  // 必须要添加此行，才不会导致脚本错误

    view.map.enableScrollWheelZoom(true);
    view.map.centerAndZoom(view.start_point, 15);  // 必须要调用此方法，该不会导致  Uncaught TypeError: Cannot read property 'Or' of undefined  错误
    BMapHelper.addZoomInOutControl(30, 10, view.map);
};

BMapPage.TextViewInit = function (begin_lng, begin_lat, end_lng, end_lat, hotelName, minute, mile, lineType, eleId) {
    if (!this instanceof BMapPage.TextViewInit) {
        return new BMapPage.TextViewInit(begin_lng, begin_lat, end_lng, end_lat, hotelName, minute, mile, lineType, eleId);
    }

    BMapPage.ViewInit(this, eleId, begin_lng, begin_lat, end_lng, end_lat);

    var walkAndDriveSearchComplete = function (result) {
        var route = result.getPlan(0).getRoute(0);  // 返回第一个方案的第一条线路
        model.details.removeAll();
        for (var i = 0, len = route.getNumSteps() ; i < len ; i++) {
            model.details.push("<b>" + (i + 1) + "</b>. " + route.getStep(i).getDescription(false));
        }
    },
      busSearchComplete = function (result) {
          model.details.removeAll();
          for (var i = 0, len = result.getNumPlans() ; i < len; i++) {
              model.details.push("<b>" + (i + 1) + "</b>. " + result.getPlan(i).getDescription(false));
          }
      },
      searchMapping = {
          "步行": { type: BMap.WalkingRoute, callback: walkAndDriveSearchComplete },
          "公交": { type: BMap.TransitRoute, callback: busSearchComplete },
          "驾车": { type: BMap.DrivingRoute, callback: walkAndDriveSearchComplete }
      },
      MyModel = function () {
          this.lineType = lineType;
          this.hotelName = hotelName;
          this.minute = minute;
          this.mile = mile;
          this.details = ko.observableArray(['加载数据中...']);
          this.goPicView = function () {
              history.back();
          };
      },
      model = new MyModel();

    ko.applyBindings(model);

    BMapHelper.lineSearch(searchMapping[lineType], this.map, this.start_point, this.end_point);
};

BMapPage.PicViewInit = function (begin_lng, begin_lat, end_lng, end_lat, hotelName, eleId) {
    if (!this instanceof BMapPage.PicViewInit) {
        return new BMapPage.PicViewInit(begin_lng, begin_lat, end_lng, end_lat, hotelName);
    }

    BMapPage.ViewInit(this, eleId, begin_lng, begin_lat, end_lng, end_lat);

    var isAssist = false, // 当没有合适路线时，自动分配驾车路线
        self = this;
    searchComplete = function (results) {
        if (!isAssist && results.getNumPlans() === 0) {
            isAssist = true;
            model.selectedIndex(3);
            doSearch(BMap.DrivingRoute);
            alert('无法找到合适步行线路，为您选择驾车方式');
            return;
        };
        var plan = results.getPlan(0);
        model.mile(plan.getDistance(true));
        model.minute(plan.getDuration(true));
        model.showStat(true);
    },
 doSearch = function (searchType) {
     BMapHelper.lineSearch({ type: searchType, callback: searchComplete }, self.map, self.start_point, self.end_point);
 },
 doMarker = function (markPoint, coorType, content) {
     BMapHelper.doMark(markPoint, coorType, content, self.map);
 },
 MyViewModel = function () {
     this.selectedIndex = ko.observable();
     this.showStat = ko.observable(false);
     this.minute = ko.observable();
     this.mile = ko.observable();
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
         doMarker(self.start_point, 0, '当前位置');
     };
     this.locateEnd = function () {
         doMarker(self.end_point, 2, hotelName);
     };
     this.goTextView = function () {
         var params = {
             minute: this.minute(),
             mile: this.mile(),
             begin_lng: begin_lng,
             begin_lat: begin_lat,
             end_lng: end_lng,
             end_lat: end_lat,
             hotelName: hotelName
         },
         lineType = this.selectedIndex() === 1 ? "步行" : this.selectedIndex() === 2 ? "公交" : "驾车";
         window.location = "MapTextView.aspx?" + $.param(params) + "&lineType=" + lineType;
     };
 },
 model = new MyViewModel();
    // Model Bind
    ko.applyBindings(model);
};
