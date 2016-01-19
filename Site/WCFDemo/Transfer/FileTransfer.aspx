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
        <asp:FileUpload runat="server" ID="FileUpload_Main" />
        <asp:Button runat="server" ID="Button_Upload" Text="Upload" />
        <br /><br /><br />
        <asp:TextBox runat="server" ID="TextBox_FileName" /> 
        <asp:Button runat="server" ID="Button_Download" Text="Download" />
    </div>
    </form>
</body>
</html>
