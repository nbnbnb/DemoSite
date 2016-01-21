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
    private WebRequest _request = null;

    // 此模型无法设置超时回调
    // 参考 http://www.cnblogs.com/scy251147/archive/2011/11/25/2263628.html

    protected void Page_Load(object sender, EventArgs e)
    {
        // Page 类的方法
        AddOnPreRenderCompleteAsync(BeginProcess, ThreadHelper.BuildSyncContextCallback(EndProcess));
    }

    /// <summary>
    /// 进行一个简单包装
    /// 在此方法中开始你的异步操作，并让线程回到线程池中
    /// </summary>
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
}