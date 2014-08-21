/// <reference path="../Scripts/json2.js" />
/// <reference path="../Scripts/jquery-1.9.1.js" />
/// <reference path="../Scripts/jquery.signalR-1.1.3.js" />
$(function () {
    // Standard drawing board functinalities

    var canvas = $("#canvas");
    var currentColor = $("#color").val();

    var buttonPressed = false;

    // 此处的  drawingBoard 通过 HubName 进行设置
    var hub = $.connection.drawingBoard;
    // 设置当前画刷的默认值
    // 用于传送给服务器端
    hub.state.color = currentColor;

    var connected = false;

    canvas
        .mousedown(function () {
            buttonPressed = true;
        })
        .mouseup(function () {
            buttonPressed = false;
        })
        .mousemove(function (e) {

            // Local Event
            if (buttonPressed) {
                setPoint(e.offsetX, e.offsetY, currentColor);
            }

            // SignalR Event
            if (buttonPressed && connected) {
                hub.server.broadcastPoint(e.offsetX, e.offsetY);
            }
        });

    var ctx = canvas[0].getContext("2d");

    function setPoint(x, y, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function clearPoints() {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
    }

    $("#clear").click(function () {

        // Local Event
        clearPoints();

        // SignalR Event
        if (connected) {
            hub.server.broadcastClear();
        }
    });

    // SignalR specific code



    // UI events
    $("#color").change(function () {
        currentColor = $("#color").val();
        // 用于 string 类型是值类型(javascript 特有的)
        // 所以此处需要重新进行赋值
        hub.state.color = currentColor;
    });

    // 服务器端会调用
    hub.client.clear = function () {
        clearPoints();
    };

    // 服务器端会调用
    hub.client.drawPoint = function (x,y,color) {
        setPoint(x, y, color);
    };

    // 开启连接
    $.connection.hub.start()
        .done(function () {
            connected = true;
        });
});