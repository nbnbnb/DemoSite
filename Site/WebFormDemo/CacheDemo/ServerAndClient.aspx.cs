using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Cache_ServerAndClient : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.ServerAndPrivate);
        Response.Cache.SetExpires(DateTime.Now.AddSeconds(30));

        // 如果设置此选择，将会忽略客户端的 Cache-Control 标头，从而严格的使用服务器端缓存控制
        // 此时与使用 页面的 <%@ OutputCache VaryByParam="none" Duration="30" %> 效果是一致的
        //Response.Cache.SetValidUntilExpires(true);

        File.AppendAllLines(@"E:\log.txt", new[] { DateTime.Now.ToString() });

    }
}