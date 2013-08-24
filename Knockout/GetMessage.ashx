<%@ WebHandler Language="C#" Class="GetMessage" %>

using System;
using System.Web;

public class GetMessage : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";

        var msg = context.Request["msg"];
        
        if (!string.IsNullOrEmpty(msg))
        {
            context.Response.Write(string.Format("{0} -> {1}", msg, DateTime.Now));
        }
        else{
            context.Response.Write("params is not correct");
        }
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}