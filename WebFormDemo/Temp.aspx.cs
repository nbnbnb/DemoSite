using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;

using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebFormDemo
{
    public partial class WebFormDemo_Temp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Button_Click.Click += Button_Click_Click;
        }

        void Button_Click_Click(object sender, EventArgs e)
        {
            throw new NullReferenceException();
        }
    }
}