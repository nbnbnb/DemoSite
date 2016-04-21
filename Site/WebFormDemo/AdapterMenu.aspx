<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AdapterMenu.aspx.cs" Inherits="DemoSite.WebFormDemo.AdapterMenu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>AdapterMenu Test</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Menu runat="server">
                <Items>
                    <asp:MenuItem Text="123"></asp:MenuItem>
                    <asp:MenuItem Text="456"></asp:MenuItem>
                </Items>
            </asp:Menu>
        </div>
    </form>
</body>
</html>
