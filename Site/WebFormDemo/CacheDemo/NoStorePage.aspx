<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NoStorePage.aspx.cs" Inherits="WebFormDemo_CacheDemo_NoStorePage" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Page with NoStore</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <a href="/">跳转首页</a> <%= DateTime.Now %>
        <a href="NoStorePage.aspx" target="_blank">复制窗口</a>
        <br />
        <p>
            默认的 Cache-Control:private【缓存保存在浏览器内存中】，表示只在客户端进行缓存，使用浏览器的后退按钮再次进入这个页面，此时将会使用客户端内存缓存数据
            如果需要强制浏览器在回退时从服务端获取数据，需要设置 Response.Cache.SetNoStore();
        </p>
        <p>
            <b>只有浏览器的后退按钮使用了内存中的缓存</b>
        </p>
    </div>
    </form>
</body>
</html>
