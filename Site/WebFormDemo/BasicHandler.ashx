<%@ WebHandler Language="C#" Class="BasicHandler" %>

using System;
using System.Web;
using System.Threading;

public class BasicHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");

        ThreadPool.QueueUserWorkItem(o =>
        {
            
        }, null);

        context.Response.Write("End in current thread.");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}