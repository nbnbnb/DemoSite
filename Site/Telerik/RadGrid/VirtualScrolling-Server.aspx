<%@ Page Title="" Language="C#" MasterPageFile="~/Telerik/TelerikMasterPage.master" AutoEventWireup="true" CodeFile="VirtualScrolling-Server.aspx.cs" Inherits="Telerik_RadGrid_VirtualScrolling" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
    
    <style type="text/css">
        .virtual-scrolling p{
            font-size:13px;
        }
    </style>

    <telerik:RadAjaxLoadingPanel ID="RadAjaxLoadingPanel1" Runat="server" MinDisplayTime="500" />

    <telerik:RadAjaxManager ID="RadAjaxManager1" runat="server" DefaultLoadingPanelID="RadAjaxLoadingPanel1">
        <AjaxSettings>
            <telerik:AjaxSetting AjaxControlID="RadGrid_First">
                <UpdatedControls>
                    <telerik:AjaxUpdatedControl ControlID="RadGrid_First" />
                </UpdatedControls>
            </telerik:AjaxSetting>
            <telerik:AjaxSetting AjaxControlID="RadAjaxManager1">
                <UpdatedControls>
                    <telerik:AjaxUpdatedControl ControlID="RadGrid_Second" />
                </UpdatedControls>
            </telerik:AjaxSetting>
        </AjaxSettings>
    </telerik:RadAjaxManager>

        <telerik:RadCodeBlock ID="RadCodeBlock1" runat="server">

            <script type="text/javascript">

                function handleScrolling(sender, args) {

                    if (args.get_isOnBottom()) {
                        var master = sender.get_masterTableView();
                        if (master.get_pageSize() < master.get_virtualItemCount()) {
                            // 此次将会触发后台的 RadAjaxManager1_AjaxRequest 事件，     
                            $find("<%= RadAjaxManager1.ClientID %>").ajaxRequest();
                        }
                    }
                }
 
            </script>

        </telerik:RadCodeBlock>

    <fieldset class="virtual-scrolling">
        <legend>PS</legend>

        <h5>此Demo演示RadGrid的Virtual功能(Server端，可以排序-仅限当前页的数据)</h5>
        <p>必须设置的属性 AllowCustomPaging="true" VirtualItemCount="2155",SaveScrollPosition="true" EnableVirtualScrollPaging="True" 其中：SaveScrollPosition 的作用为，每次回发时，保存滚动条位置，EnableVirtualScrollPaging 的作用为拖动滚动条时，模拟分页效果。</p>
        <p>必须设置的属性 OnScroll="HandleScrolling"  SaveScrollPosition="true" ,同时还需要注意 RadAjaxManager中的设置** AjaxControlID="RadAjaxManager1" ControlID="RadGrid_Second"** ，这样才可以通过 RadAjaxManager的AjaxRequest事件来触发RadGrid_Second的异步更新.
        </p>
    </fieldset>

    <br />
    <telerik:RadGrid runat="server" ID="RadGrid_First" AllowCustomPaging="true" AllowSorting="true" VirtualItemCount="2155"  PageSize="15" AllowPaging="true" AutoGenerateColumns="false">
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
            <Scrolling AllowScroll="true" EnableVirtualScrollPaging="true" UseStaticHeaders="true" SaveScrollPosition="true" />
        </ClientSettings>
    </telerik:RadGrid>

    <br />
    <telerik:RadGrid runat="server" ID="RadGrid_Second"  VirtualItemCount="2155" AllowSorting="true" PageSize="20"  AllowPaging="true" AutoGenerateColumns="false">
        <PagerStyle Visible="false" />
        <MasterTableView TableLayout="Fixed">
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
            <Scrolling AllowScroll="true" UseStaticHeaders="true" SaveScrollPosition="true"/>
            <ClientEvents OnScroll="handleScrolling" />
        </ClientSettings>
    </telerik:RadGrid>

</asp:Content>

