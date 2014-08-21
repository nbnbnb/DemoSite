<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EmployeeSearchView.aspx.cs" Inherits="MVP_SC_EmployeeSearchView" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:DropDownList runat="server" ID="DropDownListDepartments" AutoPostBack="true" />
            <asp:GridView runat="server" ID="GridViewEmployees" />
        </div>
    </form>
</body>
</html>
