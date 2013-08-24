<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ServerAndClient.aspx.cs" Inherits="Cache_ServerAndClient" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Server And Client Cache</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <p><%= DateTime.Now %></p>
            <p>
                <input type="button" value="Reload from browser cache" onclick="location.reload();" />
            </p>
            <p>
                <input type="button" value="Reload from server" onclick="location.reload(true);" />
            </p>
            <p>
                <a href="ServerAndClient.aspx" target="_blank">Open New</a>
            </p>

            <fieldset>
                <legend>PS</legend>
                <p>
                    当前使用location.reload() 或 location.reload(true)时，将会从服务器获得数据
                    而当点击链接时，将会从本地缓存获得数据
                </p>
            </fieldset>
        </div>
    </form>
</body>
</html>
