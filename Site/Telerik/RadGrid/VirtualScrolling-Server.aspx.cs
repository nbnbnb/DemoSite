using DemoSite.Northwind.LinqToSQL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Telerik_RadGrid_VirtualScrolling : System.Web.UI.Page
{
    private NorthwindDataContext db = MainDB.GetNorthwindDB();

    protected void Page_Load(object sender, EventArgs e)
    {
        RadGrid_First.NeedDataSource += new Telerik.Web.UI.GridNeedDataSourceEventHandler(RadGrid_First_NeedDataSource);
        RadGrid_Second.NeedDataSource += RadGrid_Second_NeedDataSource;
        RadAjaxManager1.AjaxRequest += new Telerik.Web.UI.RadAjaxControl.AjaxRequestDelegate(RadAjaxManager1_AjaxRequest);
    }

    void RadGrid_Second_NeedDataSource(object sender, Telerik.Web.UI.GridNeedDataSourceEventArgs e)
    {
        // 由于无法获得 CurrentPageIndex,此次由直接获取需要的总数据了
        // 效率不太高
        RadGrid_Second.DataSource = db.Order_Details.Take(RadGrid_Second.PageSize);
    }

    void RadAjaxManager1_AjaxRequest(object sender, Telerik.Web.UI.AjaxRequestEventArgs e)
    {
        // 由于无法获得 CurrentPageIndex,此次就是不断的增加PageSize 来达到获取获取数据的效果
        // 当到达最后时，将会获得所有的数据 PageSize>=MaxSize
        RadGrid_Second.PageSize += 20;
        RadGrid_Second.Rebind();
    }

    void RadGrid_First_NeedDataSource(object sender, Telerik.Web.UI.GridNeedDataSourceEventArgs e)
    {
        RadGrid_First.DataSource = db.Order_Details.Skip(RadGrid_First.CurrentPageIndex * RadGrid_First.PageSize).Take(RadGrid_First.PageSize);
    }
}