<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RepeaterBindMethod.aspx.cs" Inherits="DemoSite.WebFormDemo.RepeaterDemo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>RepeaterBindMethod</title>
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
        <pre>
            注意，对于 ItemType 属性，一定要为编译时的类型，能够通过反射进行实例化
            对于 Web Site 应用，由于其动态编译的特性，需要特别注意
        </pre>
    </form>
</body>
</html>
