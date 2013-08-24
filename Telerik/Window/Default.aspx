<%@ Page Title="" Language="C#" MasterPageFile="~/Telerik/TelerikMasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Telerik_Window_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">

    <input type="button" id="button_open" value="Open" />
    
    <asp:Button runat="server" ID="Button_Alert" Text="Alert" OnClientClick="confirmButton(this);return false;" />


    <telerik:RadWindowManager ID="RadWindowManager1" ShowContentDuringLoad="false" VisibleStatusbar="false"
        ReloadOnShow="true" runat="server" Skin="Sunset" EnableShadow="true">
        <Windows>
            <telerik:RadWindow ID="RadWindow1" runat="server" Behaviors="Close,Move" OnClientClose="OnClientClose" Modal="true" Height="350" Width="350" />
        </Windows>
    </telerik:RadWindowManager>

    <telerik:RadScriptBlock runat="server" ID="RadScriptBlock_Main">
        <script type="text/javascript">

            function confirmButton(button) {
                function aspButtonCallbackFn(arg) {
                    if (arg) {
                        __doPostBack(button.name, "");
                    }
                }
                radconfirm("Are you sure you want to postback?", aspButtonCallbackFn, 330, 110, null, "Confirm");

            }

            function OnClientClose(oWnd, args) {
                //get the transferred arguments
                var arg = args.get_argument();
                if (arg) {
                    var cityName = arg.cityName;
                    var seldate = arg.selDate;
                    $get("order").innerHTML = "You chose to fly to <strong>" + cityName + "</strong> on <strong>" + seldate + "</strong>";
                }
            }

            function sayHello(msg) {
                alert(msg);
            }

            $(function () {
                $("#button_open").bind("click", function () {
                    radopen("Dialog.aspx", "RadWindow1");
                    return false;
                });
            });
        </script>
    </telerik:RadScriptBlock>

    <div id="order" />

</asp:Content>

