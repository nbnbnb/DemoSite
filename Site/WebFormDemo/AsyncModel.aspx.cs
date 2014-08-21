using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

public partial class WebFormDemo_AsyncModel : System.Web.UI.Page
{
    WebRequest request = HttpWebRequest.Create("http://www.sina.com.cn");

    protected void Page_Load(object sender, EventArgs e)
    {
        // Page 类的方法
        // 为异步页注册不需要"状态信息"的开始和结束事件处理程序委托。
        // 此处的 状态信息 是 视图状态 还是 Session???
        AddOnPreRenderCompleteAsync(BeginProcess, SyncContextCallback(EndProcess));
    }

    // 在此方法中开始你的异步操作，并让线程回到线程池中
    private IAsyncResult BeginProcess(object sender, EventArgs e, AsyncCallback cb, object extraData)
    {
        // 即使线程池返回，网页也不会发送会客户端
        // 异步操作完成时，你的EndXxx方法会被调用；获取数据，更新网页控件，再将网页发送会客户端。

        // 此处一定要将 cb 参数传递过去
        // 表示当异步读取响应后，将会执行cb回调
        // 执行cb回调时，其实就是对EndProcess包装了一层
        // 此时就开始执行EndProcess了        
        return request.BeginGetResponse(cb, extraData);
    }

    // 此方法将会使用线程池中另一个线程来执行(在WebRequest完成请求后)
    private void EndProcess(IAsyncResult ar)
    {
        WebResponse response = request.EndGetResponse(ar);        
        using (Stream stream = response.GetResponseStream())
        {
            StreamReader sr = new StreamReader(stream);
            label_Message.Text = sr.ReadToEnd().Length.ToString() + " " + User.Identity.Name;
        }
    }

    
    // 由于线程池生成一个异步操作时，这个异步操作将由另一个线程池完成，该线程处理异步操作的结果
    // 虽然这个工作是代表原始客户端执行的，但语言文化和标识信息默认不会流向新的线程池线程
    // 解决方案
    // 使用 SynchronizationContext 将一个应用程序模型连接到线程处理模型
    private EndEventHandler SyncContextCallback(EndEventHandler callback)
    {
        SynchronizationContext sc = SynchronizationContext.Current;
        if (sc == null)
        {
            return callback;
        }
        return asyncResult =>
        {
            sc.Post((o) =>
            {
                callback((IAsyncResult)o);
            }, asyncResult);
        };
    }
    // 参考 http://www.cnblogs.com/scy251147/archive/2011/11/25/2263628.html
}