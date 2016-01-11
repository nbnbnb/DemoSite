<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ICallbackEventHandlerAjax.aspx.cs" Inherits="WebFormDemo.ICallbackEventHandlerAjax_Temp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Temp Page</title>
    <script type="text/javascript">
        function showTime() {
            var args = "测试"; // 只能传递字符串
            // product = { a: 1, b: 2, c: 3 }; 像 JSON 只能序列化为字符串进行传递
            // args 为传递的字符串参数值
            // receiveServerData 为回调函数
            // 生成的格式为 WebForm_DoCallback('__Page',args,receiveServerData,null,null,true);
            <%= Page.ClientScript.GetCallbackEventReference(this, "args", "receiveServerData", null,null, true) %>;
        }

        function receiveServerData(data) {
            alert(data);
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <input type="button" value="Client Click" onclick="showTime()" />
        </div>
    </form>
</body>
</html>
