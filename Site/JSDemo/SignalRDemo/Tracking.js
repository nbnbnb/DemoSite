/// <reference path="../Scripts/jquery-1.9.1.js" />
/// <reference path="../Scripts/jquery.signalR-1.1.3.js" />

var connection = $.connection("/tracker");
connection.start(function () {
    startTracking();
});

connection.received(function (data) {
    data = JSON.parse(data);
    var domElementId = "id" + data.id;
    var elem = createElementIfNotExists(domElementId);
    $(elem).css({ left: data.x, top: data.y }).text(data.id);

    // chunked 数据标记在 <script />标签中
    // 可以通过计数来查看获得了多少chunked数据
    //console.log($("script").length + '-' + new Date().getTime());

    //var foreverFrame=$('iframe[data-signalr-connection-id="'+connection.id+'"]');
    
    //if (foreverFrame) {
          // 在调用此回调函数之前，数据已经被清除了
    //    //console.log($("script", foreverFrame).length);
    //    console.log($(foreverFrame).attr("src"));
    //}

});


function startTracking() {
    $("body").mousemove(function (e) {
        var data = { x: e.pageX, y: e.pageY, id: connection.id };
        connection.send(JSON.stringify(data));
    });
}

/*  Helper Function */
function createElementIfNotExists(id) {
    var element = $("#" + id);
    if (element.length === 0) {
        element = $("<span class='client' id='" + id + "'></span>");
        var color = getRandomColor();
        element.css({
            backgroundColor: getRgb(color),
            color: getInverseRgb(color)
        });

        $("body").append(element).show();
    }

    return element;
}

function getRgb(rgb) {
    return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
}

function getInverseRgb(rgb) {
    return "rgb(" + (255 - rgb.r) + "," + (255 - rgb.g) + ","
        + (255 - rgb.b) + ")";
}

function getRandomColor() {
    return {
        r: Math.round(Math.random() * 256),
        g: Math.round(Math.random() * 256),
        b: Math.round(Math.random() * 256)
    };
}


