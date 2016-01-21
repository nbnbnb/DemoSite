<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CustomETag.aspx.cs" Inherits="WebFormDemo_CacheDemo_CustomETag" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>设置 ETag</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <h4>一定要设置为 HttpCacheability.ServerAndPrivate，添加 ETag 才有效</h4>

        <%= DateTime.Now %>
    </div>
    </form>
</body>
</html>
