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
            // 注意，此处的对象类型为在编译时动态生成的，所以
            // 在配置页面的 ItemType时，如果指定为页面类嵌套的类型
            // 在生成时，是无法找到的

            // 生成的嵌套类型为
            // DemoSite.WebFormDemo.RepeaterDemo+DyClass 
            // 生成的页面类型为
            // ASP.webformdemo_repeaterdemo_aspx

            // 并且类型不能与当前页面生成在同一个程序集中[将每个页面生成一个程序集]
            // 这样在反射时，也是不会找到对象的

            // 放在 App_Code中可以解决此问题
            // App_Code 中的代码会动态编译成一个程序集[单语言情况下]

            Label_Message.Text = this.GetType().FullName;
        }



        public IEnumerable<Person> Repeater_Main_GetData()
        {
            return new[]{
                new Person{UserName="ZhangJin",UserAddress="WuHan",Age=26},
                new Person{UserName="ZhangJin",UserAddress="WuHan",Age=27},
                new Person{UserName="ZhangJin",UserAddress="WuHan",Age=28}
            };
        }
    }
}