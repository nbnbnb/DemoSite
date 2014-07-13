<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Temp.aspx.cs" Inherits="WebFormDemo.WebFormDemo_Temp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Temp Page</title>
    <script type="text/javascript">
        function showTime() {
            var product = "测试"; // 只能传递字符串
            <%= Page.ClientScript.GetCallbackEventReference(this, "product", "receiveServerData", null,null, true) %>;
        }

        function receiveServerData(data) {
            alert(data);
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <h2>This is Temp Page!</h2>
        <asp:Label runat="server" ID="Label_Message" />
        <asp:Button runat="server" ID="Button_Click" Text="Server Click" />
        <input type="button" value="Client Click" onclick="showTime()" />
    </div>
    </form>
</body>
</html>
