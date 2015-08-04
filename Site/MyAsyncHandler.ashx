<%@ WebHandler Language="C#" Class="DemoSite.NBAsyncHandler" %>

using System;
using System.Web;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Threading;

namespace DemoSite
{
    public class NBAsyncHandler : IHttpAsyncHandler
    {
        private MyAsyncResult myResult;

        public IAsyncResult BeginProcessRequest(HttpContext context, AsyncCallback cb, object extraData)
        {
            // 将 HttpContext 传递到 AsyncResult 中
            // 将 Callback 传递到 AsyncResult 中
            // 当 Callback 被调用时，其内部将会调用 EndProcesssRequest 方法，同时完成 HTTP 最后响应的处理
            // 从而完成整个请求

            // 此行代码返回后，IIS 工作线程将会返回线程池中，处理其它的 HTTP 请求
            return new MyAsyncResult(context, cb, extraData);
        }

        // End 方法将会是线程池中的另一个线程调用
        public void EndProcessRequest(IAsyncResult result)
        {
            myResult.HttpContext.Response.Write(myResult.Length);
            myResult.HttpContext.Response.Write("<br />");
            myResult.HttpContext.Response.Write("abc");
        }

        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {

        }

        private class MyAsyncResult : IAsyncResult
        {
            private HttpContext _context;
            private AsyncCallback _cb;
            private object _extraData;
            private bool _isCompleted;
            private WebRequest _request;

            public MyAsyncResult(HttpContext context, AsyncCallback cb, object extraData)
            {
                _context = context;
                _cb = cb;
                _extraData = extraData;
                _isCompleted = false;
                _request = HttpWebRequest.Create("http://www.sina.com.cn");

                Process();
            }

            public HttpContext HttpContext
            {
                get { return _context; }
            }

            public int Length
            {
                get;
                private set;
            }

            private void Process()
            {
                // 发送一个异步的 HTTP 请求
                // 然后返回
                // 当异步 IO 调用完成之后，线程池中将会抽取一个工作线程，执行 ReadCompleteed 方法
                _request.BeginGetResponse(ReadCompleted, _extraData);
            }

            private void ReadCompleted(IAsyncResult ar)
            {
                for (int i = 0; i < 10; i++)
                {
                    _context.Response.Write(i);
                    _context.Response.Write("<br />");
                }

                _context.Response.Write(_context.Response.SupportsAsyncFlush);
                _context.Response.Write("<br />");

                // 一定要调用 EndXXX 方法
                WebResponse response = _request.EndGetResponse(ar);

                using (Stream stream = response.GetResponseStream())
                {
                    StreamReader sr = new StreamReader(stream);
                    Length = sr.ReadToEnd().Length;
                }

                if (_cb != null)
                {
                    // 最后告诉 IHttpAsyncHandler 后台线程事件已处理完成
                    // 现在可以调用 EndProcessRequest 方法了，返回给客户 HTTP 请求了
                    _cb(this);
                    _isCompleted = true;
                }
            }

            public object AsyncState
            {
                get
                {
                    return _extraData;
                }
            }

            public WaitHandle AsyncWaitHandle
            {
                get
                {
                    return null;
                }
            }

            public bool CompletedSynchronously
            {
                get
                {
                    return false;
                }
            }

            public bool IsCompleted
            {
                get
                {
                    return _isCompleted;
                }
            }
        }
    }


}