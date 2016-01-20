<%@ Page Title="主页" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="_Default" Culture="auto" UICulture="auto" %>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <input type="button" value="Click(Client)" id="button_doIt" />
    <input type="text" value="26" name="age" />
    <telerik:RadScriptBlock runat="server" ID="RadScriptBlock_Default">
        <script type="text/javascript">
            $(function () {
                $("#button_doIt").bind("click", function () {
                    
                });
            });
        </script>
    </telerik:RadScriptBlock>

    <asp:Label runat="server" ID="Label_Message" />
    <asp:Button runat="server" ID="Button_Click" Text="Server Click" />
</asp:Content>
