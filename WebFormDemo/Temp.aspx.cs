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
    public partial class WebFormDemo_Temp : System.Web.UI.Page, ICallbackEventHandler
    {
        private string callbackValue = String.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            Button_Click.Click += Button_Click_Click;

            //string callBack =
            //    Page.ClientScript.GetCallbackEventReference(this, "product", "ReceiveServerData", null, true);


        }

        void Button_Click_Click(object sender, EventArgs e)
        {

        }

        public string GetCallbackResult()
        {
            return callbackValue + "OK";
        }

        public void RaiseCallbackEvent(string eventArgument)
        {
            this.callbackValue = eventArgument;
        }
    }
}