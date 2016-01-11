using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_ArrayWithBind : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string[] source = { "A", "B", "C", "D" };
        rptTest.DataSource = source;
        rptTest.DataBind();

        dgTest.DataSource = source;
        dgTest.DataBind();
    }


}