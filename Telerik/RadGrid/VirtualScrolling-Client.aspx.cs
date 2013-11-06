using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using DemoSite.Northwind.LinqToSQL;

public partial class Telerik_RadGrid_VirtualScrolling_Client : System.Web.UI.Page
{
    static NorthwindDataContext db = MainDB.GetNorthwindDB();

    // 注意，此处使用了静态变量
    // 静态变量只是在此类第一次访问时，进行编译，以后所有对象，都共享此实例
    // 如果在数据库中进行了删除或增加操作，将 不会反应在页面上，除非在应程序池回收或重启后(此页面实例才会销毁)
    static int cnt = db.Order_Details.Count();

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static int GetOrderDetailsCount()
    {
        return cnt;
    }

    [WebMethod]
    public static object GetOrderDetailsData(int startRowIndex, int maxRows)
    {
        var res = db.Order_Details.Skip(startRowIndex).Take(maxRows).Select(rrr => new
        {
            OrderID = rrr.OrderID,
            ProductID = rrr.ProductID,
            UnitPrice = rrr.UnitPrice,
            Quantity = rrr.Quantity,
            Discount = rrr.Discount
        });
        return res;
    }

}