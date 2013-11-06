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

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Button_Click.Click += Button_Click_Click;
    }

    void Button_Click_Click(object sender, EventArgs e)
    {
        throw new NotImplementedException();
    }


}
