<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RepeaterExport.aspx.cs" Inherits="WebFormDemo_RepeaterExport" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Repeater Export</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Repeater runat="server" ID="Repeater_Main">
                <ItemTemplate>
                    <p>
                        <span>UserName :</span><span><%# Eval("UserName") %></span>
                        <span>UserAge :</span><span><%# Eval("UserAge") %></span>
                    </p>
                </ItemTemplate>
            </asp:Repeater>
            <asp:Button runat="server" ID="Button_Export" Text="导出" />
        </div>
    </form>
</body>
</html>
