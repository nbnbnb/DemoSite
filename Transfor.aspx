<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Transfor.aspx.cs" Inherits="Transfor" %>
<%@ PreviousPageType VirtualPath="~/Default.aspx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Transfer</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <h3>Transfor Page <%=  ((_Default)Page.PreviousPage).Message %></h3>
        <h4><%= Request.QueryString["name"] %></h4>
        <h4><%= Request.Form["age"] %></h4>
        <h5><%= Context.Items["Name"] %></h5>
    </div>
    </form>
</body>
</html>
