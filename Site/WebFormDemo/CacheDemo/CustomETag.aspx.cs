using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_CacheDemo_CustomETag : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // 一定要设置为 HttpCacheability.ServerAndPrivate，添加 ETag 才有效
        Response.Cache.SetCacheability(HttpCacheability.ServerAndPrivate);
        Response.Cache.SetETag(DateTime.Now.Ticks.ToString());

        //Response.Clear();
        //Response.StatusCode = 304;
        //Response.SuppressContent = true;
        //Response.Flush();

    }
}