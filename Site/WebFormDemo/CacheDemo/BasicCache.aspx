<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BasicCache.aspx.cs" Inherits="Cache_BasicCache" %>
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
        <p><input type="button" value="Reload from browser cache" onclick="location.reload();" /></p>
        <p><input type="button" value="Reload from server" onclick="location.reload(true);" /></p>

        <fieldset>
            <legend>PS</legend>
            <p>
                使用默认的 OutputCache 标记，缓存将会存储在服务器端 (Cache-Control: Public)
                <br /><br />
                Data:  表示响应生成的日期
                <br /><br />
                Expires: 表示缓存过期的日期,超过这个日期后，就证明文档不再新鲜了，此时需要与服务器进行再验证
                如果再验证通过，则对已缓存的文档新鲜度进行更新，如果未通过，则从服务器获取对象，载入缓存，最后发送给客户端
                最新的方式应该使用 Cache-Control: max-age=1200
                <br /><br />
                Last-Modified: 表示缓存文件生成的日期
            </p>
            <p>
                如果客户端调用 locaction.reload(),此时客户端会发送 If-Modified-Since: Date 头信息，表示将会触发新鲜度检测，
                <br />
                如过检测通过，将返回已缓存的对象，并发送304；
                <br />
                如果检测未通过，这从服务器获取新对象，载入缓存，发送200给客户端;
                <br />
                如果在这个指定的日期之后，文档被修改了， If-Modified-Since条件就为真，GET就会成功执行，携带新首部的新文档会被返回给缓存，新首部除了其他信息之外，还包含一个新的过期日期
                <br />
                如果在这个指定的日期之后，文档没有被修改，条件就为假，将会返回一个 304 Not Modified 响应报文
            </p>
            <p>
                如果客户端调用 location.reload(true),将会在请求头信息中添加一个 Pragma: no-cache标记 或 Control: no-cache，
                这表示响应实际是可以存储在本地缓存区中的，只是在与原始服务器进行新鲜度再验证之前，缓存不能将其提供给客户端使用。
                <br />
                此时服务器端会可能从缓存中或从原始服务器发送对象给客户端，且响应状态码均为200,客户端将无法区分是从缓存中还是原始服务器中获得的对象
            </p>
        </fieldset>

    </div>
    </form>
</body>
</html>
