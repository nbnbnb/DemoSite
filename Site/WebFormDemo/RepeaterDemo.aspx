<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RepeaterDemo.aspx.cs" Inherits="DemoSite.WebFormDemo.RepeaterDemo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Repeater runat="server" ItemType="DemoSite.Entities.Person" ID="Repeater_Main" SelectMethod="Repeater_Main_GetData">
                <ItemTemplate>
                    <p><%#: Item.UserName %> <%#: Item.UserAddress %> <%#: Item.Age %></p>
                </ItemTemplate>
            </asp:Repeater>
            <asp:Label runat="server" ID="Label_Message" />
        </div>
    </form>
</body>
</html>
