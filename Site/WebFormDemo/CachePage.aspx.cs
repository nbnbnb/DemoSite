using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_CachePage : System.Web.UI.Page
{


    protected void Page_Load(object sender, EventArgs e)
    {
        //Response.Cache.SetExpires(DateTime.Now.AddSeconds(60));
        //Response.Cache.SetCacheability(HttpCacheability.Server);
        //Response.Cache.SetValidUntilExpires(true);  // 只有加上了此行，才会与页面声明的效果一致

        // 如果在浏览器中，使用后退按钮查看之前页面时，将会提示找不到此页
        // 这样可以避免客户端的重复提交
        // Response.Cache.SetNoStore();

        //File.AppendAllLines(@"c:\log.txt", new[] { DateTime.Now.ToString() });
    }

    protected static string GetCurrentDate(HttpContext context)
    {
        return DateTime.Now.ToString();
    }

}