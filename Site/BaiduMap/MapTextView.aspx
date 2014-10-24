<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MapTextView.aspx.cs" Inherits="BaiduMap_MapTextView" %>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1">

    <link href="../Styles/bmapview.css" rel="stylesheet" />
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=mNKo9VLn4a7oONWaOSTT9j3w"></script>
    <script src="../Scripts/jquery-2.1.1.js"></script>
    <script src="../Scripts/underscore.js"></script>
    <script src="../Scripts/convertor.js"></script>
    <script src="../Scripts/knockout-3.2.0.js"></script>
    <script src="../Scripts/BMapPage.js"></script>

    <title>文字详情</title>
</head>
<body>
    <form id="form1" runat="server">

        <div class="textview">
            <div class="main-content">
                <div class="stat">
                    <p><span data-bind="text:lineType"></span>至<span data-bind="text:hotelName"></span>的路线</p>
                    <p><span data-bind="text:minute"></span>&nbsp;&nbsp;<span data-bind="text:mile"></span><span data-bind="click:goPicView" class="viewMap">查看地图</span></p>
                </div>

                <div class="route">
                    <p class="start">
                        <span>&nbsp;</span>起点（<b>我的位置</b>）
                    </p>
                    <div data-bind="foreach:details" class="details">
                        <p data-bind="html:$data"></p>
                    </div>
                    <p class="end">
                        终点（<b data-bind="text:hotelName"></b>）
                    </p>
                </div>
            </div>
        </div>
        <div id="allmap"></div>
    </form>

    <script>
        $(function () {
            var begin_lng=<%= Request.QueryString["begin_lng"] %>;
            var begin_lat=<%= Request.QueryString["begin_lat"] %>;
            var end_lng=<%= Request.QueryString["end_lng"] %>;
            var end_lat=<%= Request.QueryString["end_lat"] %>;
            var lineType="<%= Request.QueryString["lineType"] %>";
            var hotelName="<%= Request.QueryString["hotelName"] %>";
            var minute="<%= Request.QueryString["minute"] %>";
            var mile="<%= Request.QueryString["mile"] %>";

            BMapPage.TextViewInit(begin_lng,begin_lat,end_lng,end_lat,hotelName,minute,mile,lineType,'allmap');
        });
    </script>

</body>
</html>
