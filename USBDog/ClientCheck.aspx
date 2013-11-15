<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ClientCheck.aspx.cs" Inherits="DemoSite.USBDog.ClientCheck" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>客户端检测</title>
    <script src="../Scripts/jquery-1.9.1.js"></script>
</head>
<body>
    <embed id="s_simnew31"  type="application/npsyunew3-plugin" hidden="true" />
    <form id="form1" runat="server">
        <div>
            <fieldset>
                <legend>说明</legend>
                <p>通过在客户端生成随机数，然后通过硬件加密后，服务器端也通过随机数进行加密，然后比较是否相同</p>
                <p>
                    <input type="button" value="检测" id="client_check" />
                </p>
            </fieldset>
        </div>
    </form>

    <script type="text/javascript">
        $(function () {

            $("#client_check").bind("click", function () {

                var s_simnew31;
                //创建插件或控件
                if (navigator.userAgent.indexOf("MSIE") > 0 && !navigator.userAgent.indexOf("opera") > -1) {
                    s_simnew31 = new ActiveXObject("Syunew3A.s_simnew3");
                }
                else {
                    s_simnew31 = document.getElementById("s_simnew31"); 
                }

                //查找是否存在锁,这里使用了FindPort函数
                var devicePath = s_simnew31.FindPort(0);
                if (s_simnew31.LastError != 0) {
                    window.alert("未发现加密锁，请插入加密锁");
                    return;
                }

                // 注意，此处一定需要转换为字符串
                var key = new Date().getTime().toString();

                var value = s_simnew31.EncString(key, devicePath);
   
                $.get("check.dog",
                    { key: key, value: value },
                    function (data) {
                        if (data === "true") {
                            alert("检测通过!");
                        } else {
                            alert("检测失败!");
                        }
                    });
            });

        });


    </script>

</body>
</html>
