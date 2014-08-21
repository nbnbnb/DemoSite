<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Ajax.aspx.cs" Inherits="WCFDemo_Ajax_Ajax" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Ajax Demo</title>
    <script src="/Scripts/jquery-1.9.1.js"></script>
    <style type="text/css">
        .part {
            width: 40%;
            float: left;
        }

        .clear::after {
            content: ".";
            clear: both;
            height: 0;
            visibility: hidden;
            display: block;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <p>
                <input type="button" id="button_UserInfoGET" value="Retrieval UserInfo(GET)" />
                <input type="button" id="button_UserInfoPOST" value="Retrieval UserInfo(POST)" />
                <input type="button" id="button_UpdateUserInfoPOST" value="Update UserInfo(POST)" />
                <input type="button" id="button_JSONP" value="Retrieval UserInfo(JSONP)" />
            </p>
            <fieldset class="clear">
                <legend>Ajax With WCF</legend>

                <fieldset class="part">
                    <legend>启用JSONP后的格式</legend>
                    <pre>
                        {
                          "d": {
                            "__type": "UserInfo:#WCFDemo",
                            "Age": 26,
                            "UserAddress": {
                              "__type": "Address:#WCFDemo",
                              "City": "WuHan",
                              "Country": "Ching",
                              "Province": "HuBei"
                            },
                            "UserName": "张进"
                          }
                        }
                    </pre>
                </fieldset>
                <fieldset class="part">
                    <legend>未启用JSONP后的格式</legend>
                    <pre>
                        {
                          "Age": 26,
                          "UserAddress": {
                            "City": "WuHan",
                            "Country": "Ching",
                            "Province": "HuBei"
                          },
                          "UserName": "张进"
                        }
                    </pre>
                </fieldset>

            </fieldset>
        </div>
    </form>
    <script type="text/javascript">
        $(function () {

            var showData = function (data) {
                alert(JSON.stringify(data, null, 2));
            }

            var host = "http://localhost/WCFDemo/Ajax/AjaxService.svc/";

            $("#button_UserInfoGET").click(function () {
                $.getJSON(host + "GetUserInfoWithGet", { userName: "张进" }, function (data) { showData(data); });
            });

            $("#button_UserInfoPOST").click(function () {

                jQuery.ajax({
                    type: "POST",
                    url: host + "GetUserInfoWithPost",
                    data: '{"userName":"张Jin"}', // 此处一定要传入的为字符串参数，而且要为标准的json字符串类型,并且参数名区分大小写
                    contentType: "application/json;charaset=uft-8", // 内容类型一定要正确
                    dataType: "json",
                    success: function (data) { showData(data); }
                });

            });

            $("#button_UpdateUserInfoPOST").click(function () {

                // 与服务器端的类型相对应
                var myInfo = {
                    userInfo: {
                        Age: 26,
                        UserAddress: {
                            City: "WuHan",
                            Country: "Ching",
                            Province: "HuBei"
                        },
                        UserName: "张进"
                    }
                };

                jQuery.ajax({
                    type: "POST",
                    url: host + "UpdateUserInfoWithPost",
                    data: JSON.stringify(myInfo), // 此处一定要传入的为字符串参数，而且要为标准的json字符串类型(参数名区分大小写)
                    contentType: "application/json;charaset=uft-8", // 内容类型一定要正确
                    dataType: "json",
                    success: function (data) { showData(data); }
                });
            });

            $("#button_JSONP").click(function () {

                // 注意，此处是如何传递参数的(userName)
                $.getJSON(host + "GetUserInfoWithJSONP?callback=?", { userName: "ZhangJinJSONP" }, function (data) {
                    showData(data);
                });

            });
        });
    </script>
</body>
</html>
