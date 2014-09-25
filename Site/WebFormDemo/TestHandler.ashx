<%@ WebHandler Language="C#" Class="TestHandler" %>

using System;
using System.Web;
using System.Threading;
using System.IO;

public class TestHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");

        ThreadPool.QueueUserWorkItem(Log, context);

        //ThreadPool.QueueUserWorkItem(o =>
        //{
        //    string gg = context.Request.QueryString["name"];
        //    File.AppendAllText(@"F:\log.txt", gg + "\r\n");
        //}, null);

        context.Response.Write("End response.");

    }

    public void Log(object o)
    {
        //Thread.Sleep(5000);
        HttpContext context = o as HttpContext;
        string gg = context.Request.QueryString["name"];
        File.AppendAllText(@"F:\log.txt", gg + "\r\n");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
