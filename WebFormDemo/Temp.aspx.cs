using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_Temp:System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        NameValueCollection nvc = ConfigurationManager.GetSection("T01") as NameValueCollection;
        Hashtable ht = ConfigurationManager.GetSection("T02") as Hashtable;
        Hashtable ht2 = ConfigurationManager.GetSection("T03") as Hashtable;

        Label_Message.Text = ht2["Key2"].ToString() + ht2["Key1"].ToString();

        Button_Click.Click += Button_Click_Click;
    }

    void Button_Click_Click(object sender, EventArgs e)
    {
        EventLog logs = new EventLog();

    }
}