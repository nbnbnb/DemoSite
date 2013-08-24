using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Telerik_Window_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Event Bind
        Button_Alert.Click += new EventHandler(Button_Alert_Click);
    }

    void Button_Alert_Click(object sender, EventArgs e)
    {
        RadWindowManager1.RadAlert("Postback from asp button on " + DateTime.Now.ToString(), 300, 100, "Action Result", "sayHello('hello world!')");
    }
}

