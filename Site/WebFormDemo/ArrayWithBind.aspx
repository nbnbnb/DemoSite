<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ArrayWithBind.aspx.cs" Inherits="WebFormDemo_ArrayWithBind" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <p>
        ASP.NET 1.1 绑定方式  DataBinder.Eval(Container.DataItem,"列名").ToString()
    </p>
    <p>
        单值绑定方式 Container.DataItem
    </p>
    <form id="form1" runat="server">
        <div>
            <asp:Repeater runat="server" ID="rptTest">
                <ItemTemplate>
                    <p>
                        <%# Container.DataItem %>
                    </p>
                </ItemTemplate>
            </asp:Repeater>

            <asp:DataGrid runat="server" ID="dgTest" AutoGenerateColumns="false">
                <Columns>
                    <asp:TemplateColumn>
                        <HeaderTemplate>
                            单值列
                        </HeaderTemplate>
                        <ItemTemplate>
                            <%# Container.DataItem %>
                        </ItemTemplate>
                    </asp:TemplateColumn>
                </Columns>
            </asp:DataGrid>
        </div>
    </form>
</body>
</html>
