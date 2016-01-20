using DemoSite.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DemoSite.WebFormDemo
{

    public partial class RepeaterDemo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Label_Message.Text = this.GetType().FullName;
        }

        public IEnumerable<Person> Repeater_Main_GetData()
        {
            return new[]{
                new Person{
                    UserName ="ZhangJin",
                    UserAddress ="WuHan",
                    Age =26},
                new Person{
                    UserName ="ZhangJin",
                    UserAddress ="WuHan",
                    Age =27},
                new Person{
                    UserName ="ZhangJin",
                    UserAddress ="WuHan",
                    Age =28}
            };
        }
    }
}