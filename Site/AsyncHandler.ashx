<%@ WebHandler Language="C#" Class="AsyncHandler" %>

using System;
using System.Web;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Threading;

namespace DemoSite
{

    public class AsyncHandler : IHttpAsyncHandler
    {
        private MyAsyncResult myResult;

        public IAsyncResult BeginProcessRequest(HttpContext context, AsyncCallback cb, object extraData)
        {
            myResult = new MyAsyncResult(context, cb, extraData);
            return myResult;
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
            throw new NotImplementedException();
        }
    }

    public class MyAsyncResult : IAsyncResult
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

            WebResponse response = _request.EndGetResponse(ar);
            using (Stream stream = response.GetResponseStream())
            {
                StreamReader sr = new StreamReader(stream);
                Length = sr.ReadToEnd().Length;
            }

            if (_cb != null)
            {
                _cb(this);  // 告诉 IHttpAsyncHandler 后台线程事件已处理完成，现在可以调用 EndProcessRequest 方法了
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