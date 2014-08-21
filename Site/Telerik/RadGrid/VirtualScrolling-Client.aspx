<%@ Page Title="" Language="C#" MasterPageFile="~/Telerik/TelerikMasterPage.master" AutoEventWireup="true" CodeFile="VirtualScrolling-Client.aspx.cs" Inherits="Telerik_RadGrid_VirtualScrolling_Client" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
    <telerik:RadAjaxLoadingPanel ID="RadAjaxLoadingPanel1" Runat="server" MinDisplayTime="500" />
    <telerik:RadAjaxManager ID="RadAjaxManager1" runat="server" 
        DefaultLoadingPanelID="RadAjaxLoadingPanel1">
        <AjaxSettings>
            <telerik:AjaxSetting AjaxControlID="RadGrid_First">
                <UpdatedControls>
                    <telerik:AjaxUpdatedControl ControlID="RadGrid_First" />
                </UpdatedControls>
            </telerik:AjaxSetting>
        </AjaxSettings>
    </telerik:RadAjaxManager>

    <telerik:RadCodeBlock ID="RadCodeBlock1" runat="server">
        <script type="text/javascript">
            //<![CDATA[
            function pageLoad(sender, args) {
                toggleLoadingPanel("<%= RadGrid_First.ClientID%>", true);
                toggleLoadingPanel("<%= RadGrid_Second.ClientID%>", true);
            }

            function showLoadingPanel(sender, args) {
                toggleLoadingPanel(sender.get_id(), true);
            }

            function hideLoadingPanel(sender, args) {
                toggleLoadingPanel(sender.get_id(), false);
            }

            function toggleLoadingPanel(elementId,show) {
                var loadingPanel = $find("<%= RadAjaxLoadingPanel1.ClientID %>");
                if (show)
                {
                    loadingPanel.show(elementId);
                }
                else
                {
                    loadingPanel.hide(elementId);
                }
            }

            // 注意，此处的页数大小要设置正确，要不就显示不了滚动条，不会触发此事件了
            function handleScrolling(sender, args) {
                // check if the items scrolled to bottom and get additional items
                if (args.get_isOnBottom())
                {
                    var master = sender.get_masterTableView();
                    if (master.get_pageSize() < master.get_virtualItemCount())
                    {                        
                        master.set_pageSize(master.get_pageSize() + 20);
                    }
                }
            }
            //]]>
        </script>
    </telerik:RadCodeBlock>

    <fieldset>
        <legend>PS</legend>
        <h5>此Demo演示RadGrid的Virtual功能(Client端，无法排序)</h5>
    </fieldset>
    <br />
    <!--只有单滚动条拖动到底部时，才会触发更新，此处不需要设置 EnableVirtualScrollPaging=true 属性-->
    <!--使用此样式时需要注意，设置PageSize时 一定要让Grid产生滚动条，这个才会触发 OnScroll 事件，从而触发服务器异步获取数据-->
    <telerik:RadGrid runat="server" ID="RadGrid_Second" AllowSorting="false"  PageSize="20" AllowPaging="true" >
        <PagerStyle Mode="NumericPages" Visible="false" />
        <MasterTableView  TableLayout="Fixed">
            <Columns>
                <telerik:GridBoundColumn SortExpression="OrderID" HeaderText="OrderID" HeaderButtonType="LinkButton"
                    DataField="OrderID" UniqueName="OrderID">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="ProductID" HeaderText="ProductID" HeaderButtonType="TextButton"
                    DataField="ProductID" UniqueName="ProductID">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="UnitPrice" HeaderText="Title" HeaderButtonType="TextButton"
                    DataField="UnitPrice" UniqueName="UnitPrice">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="Quantity" HeaderText="UnitPrice" HeaderButtonType="TextButton"
                    DataField="Quantity" UniqueName="Quantity">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="Discount" HeaderText="Discount" HeaderButtonType="TextButton"
                    DataField="Discount" UniqueName="Discount">
                </telerik:GridBoundColumn>
            </Columns>            
        </MasterTableView>
        <ClientSettings>
            <Scrolling AllowScroll="true"  UseStaticHeaders="true" />
            <DataBinding Location="VirtualScrolling-Client.aspx" SelectMethod="GetOrderDetailsData" SelectCountMethod="GetOrderDetailsCount" 
                StartRowIndexParameterName="startRowIndex" MaximumRowsParameterName="maxRows" />
                <ClientEvents OnCommand="showLoadingPanel" OnDataBound="hideLoadingPanel" OnScroll="handleScrolling" />
        </ClientSettings>
    </telerik:RadGrid>
    <br />
    <!--每次滚动时，都会从数据库获取数据 其实就是根据设置 EnableVirtualScrollPaging=true 来动态获取-->
    <!--使用此样式时需要注意，一定要设置 ClientSettings 中的 EnableVirtualScrollPaging=true ，才会参数滚动条-->
    <telerik:RadGrid runat="server" ID="RadGrid_First" AllowSorting="false"  PageSize="12" AutoGenerateColumns="false" AllowPaging="true">
        <PagerStyle Mode="NextPrevAndNumeric" AlwaysVisible="true" />
        <MasterTableView DataKeyNames="OrderID" TableLayout="Fixed">
            <Columns>
                <telerik:GridBoundColumn SortExpression="OrderID" HeaderText="OrderID" HeaderButtonType="LinkButton"
                    DataField="OrderID" UniqueName="OrderID">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="ProductID" HeaderText="ProductID" HeaderButtonType="TextButton"
                    DataField="ProductID" UniqueName="ProductID">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="UnitPrice" HeaderText="Title" HeaderButtonType="TextButton"
                    DataField="UnitPrice" UniqueName="UnitPrice">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="Quantity" HeaderText="UnitPrice" HeaderButtonType="TextButton"
                    DataField="Quantity" UniqueName="Quantity">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn SortExpression="Discount" HeaderText="Discount" HeaderButtonType="TextButton"
                    DataField="Discount" UniqueName="Discount">
                </telerik:GridBoundColumn>
            </Columns>             
        </MasterTableView>
        <ClientSettings>
            <Scrolling AllowScroll="true" EnableVirtualScrollPaging="true" UseStaticHeaders="true" />
            <DataBinding Location="VirtualScrolling-Client.aspx" SelectMethod="GetOrderDetailsData" SelectCountMethod="GetOrderDetailsCount" 
                StartRowIndexParameterName="startRowIndex" MaximumRowsParameterName="maxRows" />
                <ClientEvents OnCommand="showLoadingPanel" OnDataBound="hideLoadingPanel" />
        </ClientSettings>
    </telerik:RadGrid>



</asp:Content>

