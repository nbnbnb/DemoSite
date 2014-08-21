using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Cache_ClientCache : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.Private);
        Response.Cache.SetExpires(DateTime.Now.AddSeconds(30));

        File.AppendAllLines(@"E:\log.txt", new[] { DateTime.Now.ToString() });
    }
}