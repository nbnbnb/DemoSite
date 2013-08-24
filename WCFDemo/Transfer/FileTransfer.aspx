<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FileTransfer.aspx.cs" Inherits="WCFDemo_FileTransfer" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>File Transfer</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Button runat="server" ID="Button_Download" Text="Download" />
        <br />
        <asp:FileUpload runat="server" ID="FileUpload1" />
        <asp:Button runat="server" ID="Button_Upload" Text="Upload" />
    </div>
    </form>
</body>
</html>
