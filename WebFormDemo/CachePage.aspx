<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CachePage.aspx.cs" Inherits="WebFormDemo_CachePage" %>
<%@ OutputCache Duration="60" VaryByParam="none" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Cache Page Demo</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Button runat="server" ID ="B" Text="Server Click" />
        <br />
        Cache Time:<%= DateTime.Now %>
        <br />
        Real  Time: <% Response.WriteSubstitution(new HttpResponseSubstitutionCallback(GetCurrentDate)); %>
        <a href="/">Home</a>
        <br />
        <input type="submit" value="Sumbit" />
    </div>
    </form>
</body>
</html>
