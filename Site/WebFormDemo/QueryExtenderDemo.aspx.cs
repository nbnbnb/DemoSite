using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.Expressions;

namespace DemoSite.WebFormDemo.QueryExtenderDemo
{

    public partial class WebFormDemo_QueryExtenderDemo : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        public static IQueryable MethodFilter(IQueryable query)
        {
            //return query.Where("it.CustomerID=@0", "GROSR");
            return query;
        }

        protected void Custom_Querying(object sender, CustomExpressionEventArgs e)
        {
            //e.Query = e.Query.Where("it.OrderID=@0", e.Values["BTKing"]);
        }
    }
}