<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BasicServerCache.aspx.cs" Inherits="Cache_BasicCache" %>
<%@ OutputCache VaryByParam="none" Duration="20" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Basic Cache</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <p><%= DateTime.Now %></p>
        <p><input type="button" value="reload()" onclick="location.reload();" /></p>
        <p><input type="button" value="reload(true)" onclick="location.reload(true);" /></p>

        <fieldset>
            <legend>PS</legend>
            <p>
                使用 OutputCache VaryByParam="none" Duration="20" 指令，无条件缓存服务响应 20s
                <br />
                缓存控制为 Cache-Control:public，服务端和客户端都会进行缓存，客户端的过期时间也是 20s
            </p>
            <p>
                如果客户端调用 locaction.reload() 等价于 F5，此时客户端会发送 If-Modified-Since: Date 头信息，会触发服务端新鲜度检测
            </p>
            <p>
                如果客户端调用 location.reload(true) 等价于 Ctrl+F5 将会在请求头信息中添加 Pragma: no-cache 和 Cache-Control: no-cache，不会触发服务端新鲜度检测【所有资源都不会返回 3xx 状态码，但是如果服务端也有缓存，则返回的 200 状态码数据也是缓存中的】
            </p>
            <p>
                可以使用 Response.Cache.SetValidUntilExpires(true); 方法忽略客户端的缓存治理
                Specifies whether the ASP.NET cache should ignore HTTP Cache-Control headers sent by the client that invalidate the cache.
            </p>
        </fieldset>
    </div>
    </form>
</body>
</html>
