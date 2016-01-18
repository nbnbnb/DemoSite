<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ClientCache.aspx.cs" Inherits="Cache_ClientCache" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Client Cache</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <p><%= DateTime.Now %></p>
        <p><input type="button" value="Reload from browser cache" onclick="location.reload();" /></p>
        <p><input type="button" value="Reload from server" onclick="location.reload(true);" /></p>  
        
        <p> 
            <a href="ClientCache.aspx" target="_blank">Open New</a> 
        </p>

        <fieldset>
            <legend>PS</legend>
            <p>
                此处使用了客户端缓存(保存在浏览器缓存中)，当打开同一个链接时 ，是从客户端缓存中读取数据，而不会与服务器
                端有任何的交互(就算服务器端的内容已经改变了)，只有当缓存到期时(Expires 标记过期时间之后)，才会从服务器端重新获得数据
                此时的响应头为 
                <br />
                Cache-Control: private
                <br />
                Date: Sun, 26 May 2013 07:20:47 GMT
                <br />
                Expires: Sun, 26 May 2013 07:21:17 GMT
            </p>
        </fieldset>
          
    </div>
    </form>
</body>
</html>
