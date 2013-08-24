using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Caching;
using System.Configuration;
using Telerik.Web.UI;
using System.Net.Mail;
using System.Net;
using System.Threading;
using System.Globalization;
using System.Diagnostics;
using DemoLib;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Button_Transfor.Click += Button_Transfor_Click;

        Message = "Button Transfor";

        Context.Items.Add("Name", "ZhangJin");
    }

    void Button_Transfor_Click(object sender, EventArgs e)
    {
        Server.Transfer("Transfor.aspx", true);       
    }

    public string Message { get; set; }
}
