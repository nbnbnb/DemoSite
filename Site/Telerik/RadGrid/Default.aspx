<%@ Page Title="" Language="C#" MasterPageFile="~/Telerik/TelerikMasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Telerik_RadGrid_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">   
    <telerik:RadAjaxManager ID="RadAjaxManager1" runat="server" 
        DefaultLoadingPanelID="RadAjaxLoadingPanel1">
        <AjaxSettings>
            <telerik:AjaxSetting AjaxControlID="RadGrid1">
                <UpdatedControls>
                    <telerik:AjaxUpdatedControl ControlID="RadGrid1" />
                </UpdatedControls>
            </telerik:AjaxSetting>
        </AjaxSettings>
    </telerik:RadAjaxManager>
    <telerik:RadAjaxLoadingPanel ID="RadAjaxLoadingPanel1" Runat="server" >
    </telerik:RadAjaxLoadingPanel>
    <telerik:RadGrid ID="RadGrid1" runat="server" AllowPaging="True" 
        AllowSorting="True" CellSpacing="0" Culture="zh-CN" 
        DataSourceID="LinqDataSource1" GridLines="None">
        <ClientSettings>
            <Scrolling AllowScroll="True" UseStaticHeaders="True" />
        </ClientSettings>
        <MasterTableView AutoGenerateColumns="False" DataKeyNames="CustomerID" 
            DataSourceID="LinqDataSource1">
            <CommandItemSettings ExportToPdfText="Export to PDF">
            </CommandItemSettings>
            <RowIndicatorColumn Visible="True" FilterControlAltText="Filter RowIndicator column">
                <HeaderStyle Width="20px"></HeaderStyle>
            </RowIndicatorColumn>
            <ExpandCollapseColumn Visible="True" FilterControlAltText="Filter ExpandColumn column">
                <HeaderStyle Width="20px"></HeaderStyle>
            </ExpandCollapseColumn>
            <Columns>
                <telerik:GridBoundColumn DataField="CustomerID" 
                    FilterControlAltText="Filter CustomerID column" HeaderText="CustomerID" 
                    ReadOnly="True" SortExpression="CustomerID" UniqueName="CustomerID">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="CompanyName" 
                    FilterControlAltText="Filter CompanyName column" HeaderText="CompanyName" 
                    SortExpression="CompanyName" UniqueName="CompanyName">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="ContactName" 
                    FilterControlAltText="Filter ContactName column" HeaderText="ContactName" 
                    SortExpression="ContactName" UniqueName="ContactName">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="ContactTitle" 
                    FilterControlAltText="Filter ContactTitle column" HeaderText="ContactTitle" 
                    SortExpression="ContactTitle" UniqueName="ContactTitle">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="Address" 
                    FilterControlAltText="Filter Address column" HeaderText="Address" 
                    SortExpression="Address" UniqueName="Address">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="City" 
                    FilterControlAltText="Filter City column" HeaderText="City" 
                    SortExpression="City" UniqueName="City">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="Region" 
                    FilterControlAltText="Filter Region column" HeaderText="Region" 
                    SortExpression="Region" UniqueName="Region">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="PostalCode" 
                    FilterControlAltText="Filter PostalCode column" HeaderText="PostalCode" 
                    SortExpression="PostalCode" UniqueName="PostalCode">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="Country" 
                    FilterControlAltText="Filter Country column" HeaderText="Country" 
                    SortExpression="Country" UniqueName="Country">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="Phone" 
                    FilterControlAltText="Filter Phone column" HeaderText="Phone" 
                    SortExpression="Phone" UniqueName="Phone">
                </telerik:GridBoundColumn>
                <telerik:GridBoundColumn DataField="Fax" 
                    FilterControlAltText="Filter Fax column" HeaderText="Fax" SortExpression="Fax" 
                    UniqueName="Fax">
                </telerik:GridBoundColumn>
            </Columns>
            <EditFormSettings>
                <EditColumn FilterControlAltText="Filter EditCommandColumn column">
                </EditColumn>
            </EditFormSettings>
        </MasterTableView>
        <FilterMenu EnableImageSprites="False">
            <WebServiceSettings>
                <ODataSettings InitialContainerName="">
                </ODataSettings>
            </WebServiceSettings>
        </FilterMenu>
        <HeaderContextMenu CssClass="GridContextMenu GridContextMenu_Default">
            <WebServiceSettings>
                <ODataSettings InitialContainerName="">
                </ODataSettings>
            </WebServiceSettings>
        </HeaderContextMenu>
    </telerik:RadGrid>
    <asp:LinqDataSource ID="LinqDataSource1"  runat="server"  ContextTypeName="DemoSite.Northwind.LinqToSQL.NorthwindDataContext" EntityTypeName="" TableName="Customers">
    </asp:LinqDataSource>
    
</asp:Content>

