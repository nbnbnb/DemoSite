<%@ Page Language="C#" AutoEventWireup="true" CodeFile="QueryExtenderDemo.aspx.cs" Inherits="DemoSite.WebFormDemo.QueryExtenderDemo.WebFormDemo_QueryExtenderDemo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>QueryExtender 控件</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox runat="server" ID="TextBox_CustomerID" />
        <asp:Button ID="Button1" runat="server" Text="Search" />
        <asp:GridView runat="server" ID="GridView_Main" DataSourceID="LinqDataSource_Main" />
        <asp:LinqDataSource runat="server" ID="LinqDataSource_Main" TableName="Orders"
             ContextTypeName="DemoSite.Northwind.LinqToSQL.NorthwindDataContext" />
        <asp:QueryExtender runat="server" TargetControlID="LinqDataSource_Main">
            <asp:SearchExpression DataFields="CustomerID" ComparisonType="OrdinalIgnoreCase" SearchType="Contains">
                <asp:ControlParameter ControlID="TextBox_CustomerID" />
            </asp:SearchExpression>
        </asp:QueryExtender>
    </div>
    </form>
</body>
</html>
