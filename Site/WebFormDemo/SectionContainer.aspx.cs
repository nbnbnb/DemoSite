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
    public partial class WebFormDemo_SectionContainer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // T01 和 T02 节点可以使用相同的方式进行设置
            // 不过此处返回的类型是不同的
            NameValueCollection nvc = ConfigurationManager.GetSection("T01") as NameValueCollection;
            Hashtable ht_1 = ConfigurationManager.GetSection("T02") as Hashtable;


            // T03 可以内联的一次设置多个键值对
            Hashtable ht_2 = ConfigurationManager.GetSection("T03") as Hashtable;

            Label_Key1.Text = nvc["Key1"];
            Label_Key2.Text = nvc["Key2"];

            Label_Key3.Text = ht_1["Key3"].ToString();

            Label_Key4.Text = ht_2["Key4"].ToString();
            Label_Key5.Text = ht_2["Key5"].ToString();
        }
    }
}