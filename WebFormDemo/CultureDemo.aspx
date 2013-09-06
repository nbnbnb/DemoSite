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
            <%= DateTime.Now.ToLongDateString() %>

            <br />
            Culture: <%= System.Threading.Thread.CurrentThread.CurrentCulture %>

            <br />
            UICulture: <%= System.Threading.Thread.CurrentThread.CurrentUICulture %>

            <br />
            <asp:Label ID="Label_Country" runat="server" meta:resourcekey="Label_CountryResource" />
            <p>
                通过 设置 Culture="auto" ,ASP.NET 线程将会通过浏览器的语言设置来控制Page对象的Culture特性
            用于控制 日期，数字的显示
            </p>
            <p>
                通过设置 UICulture="auto:zh"，ASP.NET 线程将会通过浏览器的语言设置来控制Page对象的UICulture特性
                此特性用于控制如何正确的选择资源文件，此处当无法找到正确区域的资源文件时，还指定了默认值 zh.
                当客户端指定的语言在资源文件中没有指定时，将会使用 zh 的文化设置；客户端未指定，且都设置为auto ,则将会
                使用服务器的默认区域设置。
            </p>
            <p>/* 注意 */ 默认的资源文件不能删除，否则当客户指定的区域文化没在资源文件中指定时，将无法正确的显示
                <br />
                算法：判断是否有正确的资源文件，则使用此资源，否则判断是否有 UICulture="auto:kkk"指定的 kkk区域资源
                如果有，则显示，如果没有，则加载无区域设置的资源文件。
            </p>

        </div>
    </form>
</body>
</html>
