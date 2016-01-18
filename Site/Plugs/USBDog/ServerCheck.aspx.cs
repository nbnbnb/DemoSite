using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Runtime.InteropServices;

namespace DemoSite.USBDog
{
    public partial class ServerCheck : System.Web.UI.Page
    {
        SoftKey ytsoftkey;
        String KeyPath;
        protected void Page_Load(object sender, EventArgs e)
        {
            //这个用于判断系统中是否存在着加密锁。不需要是指定的加密锁
            ytsoftkey = new SoftKey();
            int start = 0;
            int ret = ytsoftkey.FindPort(start, ref KeyPath);
            if (ret != 0) Response.Write("未找到加密锁,请插入加密锁后，再进行操作。");

        }

        protected void Button2_Click1(object sender, EventArgs e)
        {
            //使用增强算法一来检查是否存在指定的加密锁
            // 需要在加密狗中和服务器算法中，使用同要给密钥
            int ret;
            ret = ytsoftkey.CheckKeyByEncstring();
            if (ret == 1)
            {
                Response.Write("你生成加密代码时没有设置该函数");
                return;
            }
            if (ret == 0)
            {
                Response.Write("找到指定的加密锁");
            }
            else
            {
                Response.Write("未能找到指定的加密锁");
            }
        }

        protected void Button3_Click1(object sender, EventArgs e)
        {
            // 使用读写储存器来检查是否存在指定的加密锁
            // 需要使用正确的读取密钥
            int ret;
            ret = ytsoftkey.CheckKeyByReadEprom();
            if (ret == 1)
            {
                Response.Write("你生成加密代码时没有设置该函数");
                return;
            }
            if (ret == 0)
            {
                Response.Write("找到指定的加密锁");
            }
            else
            {
                Response.Write("未能找到指定的加密锁");
            }
        }

    }
}