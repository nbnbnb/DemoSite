<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Calc.aspx.cs" Inherits="WCFDemo_Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <title>WCF Calc Demo(With Http,Pipe,TCP)</title>

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <p>
                <asp:TextBox ID="TextBox_A" runat="server" Text="9" />
                <asp:TextBox ID="TextBox_B" runat="server" Text="12" />
                <asp:Button ID="Button_Add" runat="server" Text="Add(Http)" />
                <asp:Button ID="Button_Substraction" runat="server" Text="Substraction(TCP)" />
                <asp:Button ID="Button_Add2" runat="server" Text="Add(NamedPipe)" />
            </p>

            <p><a href="http://blog.csdn.net/myloy/article/details/6979007" target="_blank">参考 http://blog.csdn.net/myloy/article/details/6979007</a></p>
        </div>
    </form>

</body>
</html>
