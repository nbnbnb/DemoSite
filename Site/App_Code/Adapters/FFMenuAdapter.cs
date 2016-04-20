using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace DemoSite.Adapters
{

    /// <summary>
    /// FFMenuAdapter 的摘要说明
    /// </summary>
    public class FFMenuAdapter : System.Web.UI.WebControls.Adapters.MenuAdapter
    {
        protected override void EndRender(HtmlTextWriter writer)
        {
            base.EndRender(writer);
            writer.Write("This is a Firefox Adapter");
        }
    }
}