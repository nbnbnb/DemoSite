<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PNGReduce.aspx.cs" Inherits="WebFormDemo_PNGReduce" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button runat="server" ID="Button_DoIt" Text="Server Click" />
            <asp:FileUpload runat="server" ID="FileUpload_PNG" />
        </div>
    </form>
</body>
</html>
