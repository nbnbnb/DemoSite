<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DefaultPageCache.aspx.cs" Inherits="WebFormDemo_CacheDemo_DefaultPageCache" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>ASP.NET 默认缓存控制</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <p><%= DateTime.Now %></p>
        <p> <a href="/">跳转首页</a> <a href="NoStorePage.aspx" target="_blank">复制窗口</a></p>
        <p>页面默认生成的缓存控制为 Cache-Control:private，表示缓存数据只保存在浏览器内存中，当使用浏览器的后退按钮时，将会读取缓存数据；浏览器关闭后，内存中的缓存数据将会清空；如果需要在后退时重新发起请求，需要使用 Response.Cache.SetNoStore(); 方法</p>
    </div>
    </form>
</body>
</html>
