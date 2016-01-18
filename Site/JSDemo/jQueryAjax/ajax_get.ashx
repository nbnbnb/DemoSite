<%@ WebHandler Language="C#" Class="temp" %>

using System;
using System.Web;

public class temp : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        System.Threading.Thread.Sleep(2000);
        context.Response.Write(DateTime.Now.ToLongTimeString());
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}