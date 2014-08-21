<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="ServerCheck.aspx.cs" Inherits="DemoSite.USBDog.ServerCheck" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>服务器端检测</title>
</head>
<body>
    <form id="form1" runat="server">
        <br />
        <br />
        使用增强算法一的方式检查加密锁<br />
        <asp:Button ID="Button2" runat="server" Height="45px" OnClick="Button2_Click1" Text="查找指定的加密锁"
            Width="215px" /><br />
        <br />
        <br />
        使用设置数据到锁的方式检查加密锁<br />
        <asp:Button ID="Button3" runat="server" Height="45px" OnClick="Button3_Click1" Text="查找指定的加密锁"
            Width="215px" /><br />
        <br />
        <br />
        <br />
    </form>
</body>
</html>
