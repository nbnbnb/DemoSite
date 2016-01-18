/// <reference path="../Scripts/jquery-1.9.1.js" />
/// <reference path="../Scripts/jquery.signalR-1.1.3.js" />

$(function () {
    var hub = $.connection.progressBar;
    hub.client.update = function (value) {
        console.log(value);
        $("#progressBar")
            .css("width", value + "%")
            .text(value + "%");
    };

    $("#start").click(function () {
        $(this).attr("disabled", true);
        $("#result")
            .hide("slow")
            .load("hardprocess.aspx?connId=" + $.connection.hub.id,
                function () {
                    $(this).slideDown("slow");
                    $("#start").attr("disabled", false);
                });
    });

    $.connection.hub.start(function () {
        $("#start").attr("disabled", false);
    });

});