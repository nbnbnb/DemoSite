<%@ Page Language="C#" Culture="auto" UICulture="auto:zh" AutoEventWireup="true" CodeFile="CultureDemo.aspx.cs" Inherits="WebFormDemo.WebFormDemo_CultureDemo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Culture Demo</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <%= DateTime.Now.ToLongDateString() %>【通过 Culture 进行控制】

            <br />
            Culture: <%= System.Threading.Thread.CurrentThread.CurrentCulture %>

            <br />
            UICulture: <%= System.Threading.Thread.CurrentThread.CurrentUICulture %>

            <br />
            <asp:Label ID="Label_Country" runat="server" meta:resourcekey="Label_CountryResource" />
            <p>
                Culture="auto"，获取浏览器的语言首选项，设置 Page 对象的Culture 属性，可以用来控制服务端日期、数字的显示
            </p>
            <p>
                UICulture="auto:zh"，获取浏览器的语言首选项，设置 Page 对象的 UICulture 属性
                此属性用于控制如何正确的选择资源文件，如果没有匹配的区域资源，则使用 zh【zh 资源必须要存在】                
            </p>

            <asp:Label runat="server" ID="Label_Message" />
        </div>
    </form>
</body>
</html>
