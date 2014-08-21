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
        Page.AsyncTimeout = TimeSpan.FromMilliseconds(1000);        

        // 使用任务模型，可以指定处理超时时的委托，还可以指定此任务是否也已与其他任务并行执行
        PageAsyncTask task = new PageAsyncTask(BeginProcess, EndProcess, TimeProcess, null, true);

        // 注册异步任务
        RegisterAsyncTask(task);

        // 开始运行
        ExecuteRegisteredAsyncTasks();
        
    }

    // 在此方法中开始你的异步操作，并让线程回到线程池中
    private IAsyncResult BeginProcess(object sender, EventArgs e, AsyncCallback cb, object extraData)
    {
        // 即使线程池返回，网页也不会发送会客户端
        // 异步操作完成时，你的EndXxx方法会被调用；获取数据，更新网页控件，再将网页发送会客户端。

        // 此处一定要将 cb 参数传递过去
        // 表示当异步读取响应后，将会执行cb回调
        // 而执行cb回调时，其实就是对EndProcess包装了一层
        // 此时就开始执行EndProcess了        
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

    private void TimeProcess(IAsyncResult ar)
    {
        label_Message.Text = "请求超时";             
    }
}