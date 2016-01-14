using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_AsyncModelWithTask : System.Web.UI.Page
{
    WebRequest request = HttpWebRequest.Create("http://www.sina.com.cn");

    protected void Page_Load(object sender, EventArgs e)
    {

        // 指定异步执行时的超时时间
        // 将此参数设置为一个比较小的值，将会导致执行请求超时的那个回调函数
        Page.AsyncTimeout = TimeSpan.FromMilliseconds(5000);

        /*
        ASP.NET 4.5 与 4.0 不兼容
        在当前应用程序配置中，不支持给 PageAsyncTask 构造函数提供非 null 的“timeoutHandler”或为 true 的“executeInParallel”参数值。 要变通解决此问题，请在 Web.config 中添加以下配置开关:
        < appSettings >
         < add key = "aspnet:UseTaskFriendlySynchronizationContext" value = "false" />
           </ appSettings >
           有关详细信息，请参阅: http://go.microsoft.com/fwlink/?LinkId=252465。
        */
        // 使用任务模型，可以指定处理超时发生时的委托，还可以指定此任务是否与其他任务并行执行
        PageAsyncTask task = new PageAsyncTask(BeginProcess, EndProcess, null, null, false);

        // 注册异步任务
        // Page 类的方法
        RegisterAsyncTask(task);

        // 开始运行
        ExecuteRegisteredAsyncTasks();

    }

    // 在此方法中开始你的异步操作
    // 执行后立即返回
    // HttpApplication 对象此时可以立即返回到池中
    private IAsyncResult BeginProcess(object sender, EventArgs e, AsyncCallback cb, object extraData)
    {
        // 即使线程池返回，网页也不会发送会客户端
        // 异步操作完成时，你的EndXxx方法会被调用；获取数据，更新网页控件，再将网页发送会客户端。

        // 当 cb 回调触发的时候，将会执行 EndProcess 
        return request.BeginGetResponse(cb, extraData);
    }

    private void EndProcess(IAsyncResult ar)
    {
        try
        {
            WebResponse response = request.EndGetResponse(ar);
            using (Stream stream = response.GetResponseStream())
            {
                StreamReader sr = new StreamReader(stream);
                label_Message.Text = sr.ReadToEnd().Length.ToString() + " " + User.Identity.Name;
            }
        }
        catch (NotImplementedException ex)
        {
            label_Message.Text = ex.Message;
        }
    }

    private void TimeoutProcess(IAsyncResult ar)
    {
        label_Message.Text = "请求超时";
    }
}