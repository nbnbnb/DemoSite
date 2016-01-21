using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_AsyncModelWithTask : System.Web.UI.Page
{
    private WebRequest _request;

    protected void Page_Load(object sender, EventArgs e)
    {
        // 指定异步执行时的超时时间
        Page.AsyncTimeout = TimeSpan.FromMilliseconds(5000);

        // 设置一个较小的值，验证超时回调
        //Page.AsyncTimeout = TimeSpan.FromMilliseconds(10);

        /*
        ASP.NET 4.5 与 4.0 不兼容
        在当前应用程序配置中，不支持给 PageAsyncTask 构造函数提供非 null 的“timeoutHandler”或为 true 的“executeInParallel”参数值。 
        要变通解决此问题，请在 Web.config 中添加以下配置开关:
        <appSettings>
         <add key = "aspnet:UseTaskFriendlySynchronizationContext" value = "false" />
        </appSettings >
        有关详细信息，请参阅: http://go.microsoft.com/fwlink/?LinkId=252465。
        */

        PageAsyncTask task = new PageAsyncTask(
            BeginProcess,
            ThreadHelper.BuildSyncContextCallback(EndProcess),
            ThreadHelper.BuildSyncContextCallback(TimeoutProcess),
            null,
            false);

        // 注册异步任务
        RegisterAsyncTask(task);

        // 开始运行
        ExecuteRegisteredAsyncTasks();
    }

    // 在此方法中开始你的异步操作
    // 执行后立即返回
    // HttpApplication 对象此时可以立即返回到池中
    private IAsyncResult BeginProcess(object sender, EventArgs e, AsyncCallback cb, object extraData)
    {
        _request = HttpWebRequest.Create("http://www.sina.com.cn");
        return _request.BeginGetResponse(cb, extraData);
    }

    private void EndProcess(IAsyncResult ar)
    {
        WebResponse response = _request.EndGetResponse(ar);
        Label_Message.Text = "Sina ContentLength：" + response.ContentLength.ToString() +
            " Time：" + DateTime.Now.ToLongDateString() +  // 测试线程数据是否都同步过来了
            " Culture：" + Thread.CurrentThread.CurrentCulture;
    }

    private void TimeoutProcess(IAsyncResult ar)
    {
        Label_Message.Text = "请求超时";
    }

}