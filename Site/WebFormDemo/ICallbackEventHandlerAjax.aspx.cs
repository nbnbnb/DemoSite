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
    public partial class ICallbackEventHandlerAjax_Temp : System.Web.UI.Page, ICallbackEventHandler
    {
        private string _eventArgs = String.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
        }

        /// <summary>
        /// 返回给客户端 Ajax 请求数据
        /// </summary>
        /// <returns></returns>
        public string GetCallbackResult()
        {
            return String.Format("{0}-Ticks：{1}", _eventArgs, DateTime.Now.Ticks);
        }

        /// <summary>
        /// 这是继承的 ICallbackEventHandler 接口
        /// 客户端执行方法时，将会执行此接口
        /// </summary>
        /// <param name="eventArgument"></param>
        public void RaiseCallbackEvent(string eventArgument)
        {
            _eventArgs = eventArgument;
        }
    }
}