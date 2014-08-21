<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="TelerikMain.aspx.cs" Inherits="Telerik_TelerikMain" %>

<asp:Content ID="PageMain" ContentPlaceHolderID="MainContent" Runat="Server">

<telerik:RadAjaxManager ID="RadAjaxManager1" runat="server"  DefaultLoadingPanelID="RadAjaxLoadingPanel1">
    <AjaxSettings>
        <telerik:AjaxSetting AjaxControlID="RadTreeView1">
            <UpdatedControls>
                <telerik:AjaxUpdatedControl ControlID="RadSplitter1"  LoadingPanelID="RadAjaxLoadingPanel1" />
            </UpdatedControls>
        </telerik:AjaxSetting>
    </AjaxSettings>
</telerik:RadAjaxManager>

<telerik:RadAjaxLoadingPanel ID="RadAjaxLoadingPanel1" Runat="server" MinDisplayTime="300" IsSticky="false" style="position:absolute;width:100%;height:100%;top:0;left:0;">
</telerik:RadAjaxLoadingPanel>

<telerik:RadSplitter ID="RadSplitter1" Runat="server" Width="100%" Height="450">
    <telerik:RadPane runat="server" Width="20%">
        <telerik:RadTreeView ID="RadTreeView1" Runat="server" Width="100%" Height="100%">        
        </telerik:RadTreeView>        
    </telerik:RadPane>
    <telerik:RadSplitBar runat="server" BorderWidth="1" CollapseMode="Forward"></telerik:RadSplitBar>
    <telerik:RadPane runat="server" ID="RadPane_Nav" ShowContentDuringLoad="true" Height="100%"></telerik:RadPane>
</telerik:RadSplitter>

<telerik:RadScriptBlock runat="server" ID="RadScriptBlock_Telerik">
    <script type="text/javascript">

        // 用户自定义函数
        function toggleCollapsePane() {
            var splitter = $find("<%= RadSplitter1.ClientID %>");
            //var pane = splitter.getPaneById("<%= ((RadPane)(RadSplitter1.GetPanes()[0])).ClientID%>");
            var pane = splitter.getPaneByIndex(0);
            if (!pane)
            {
                return;
            }
            if (pane.get_collapsed())
            {
                pane.expand();
            }
            else
            {
                pane.collapse();
            }
        }

        // 页面加载时执行
        $(function () {

        });

        // 事件绑定
        $(function () {
            $(window).bind("keydown", null, function (e) {
                if (e.keyCode === 84 && e.target == document.body)    // 当按下 t 时，显示或隐藏 TreeViewT ,同时还是确认不是输入框
                {
                    toggleCollapsePane();

                    // 取消默认的事件冒泡和其他关联事件
                    return false;
                }
            });
        });            
    </script>
</telerik:RadScriptBlock>

</asp:Content>

