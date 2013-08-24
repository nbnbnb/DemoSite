<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Temp.aspx.cs" Inherits="WebFormDemo_Temp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Temp Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <h2>This is Temp Page!</h2>
        <asp:Label runat="server" ID="Label_Message" />
        <asp:Button runat="server" ID="Button_Click" Text="Click" />
        <asp:GridView runat="server" ID="GridView_Events" />
    </div>
    </form>
</body>
</html>
