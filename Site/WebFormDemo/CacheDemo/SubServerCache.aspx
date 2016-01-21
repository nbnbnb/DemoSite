<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SubServerCache.aspx.cs" Inherits="WebFormDemo_CachePage" %>
<%@ OutputCache Duration="60" VaryByParam="none" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Cache Page Demo</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button runat="server" ID="B" Text="Server Click" />
            <br />
            Cache Time:<%= DateTime.Now %>
            <br />
            Real  Time: <% Response.WriteSubstitution(new HttpResponseSubstitutionCallback(GetCurrentDate)); %>
            <a href="/">Home</a>
            <br />
            <input type="submit" value="Sumbit" />
        </div>
        <p>
            当在页面中加入了  Response.WriteSubstitution 后， OutputCache 生成的控制标记为 Cache-Control:no-cache 和 Pragma:no-cache Expires：-1，表示客户端不应进行缓存
        </p>
        <p>
            服务端在每次冲缓存中获取数据之后，只更新 Response.WriteSubstitution 回调返回的数据，由于回调方法是静态的，所以根本就不会创建 Page 实例
        </p>
    </form>
</body>
</html>
