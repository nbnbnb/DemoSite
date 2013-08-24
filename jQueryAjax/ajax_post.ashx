<%@ WebHandler Language="C#" Class="temp" %>

using System;
using System.Web;

public class temp : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        System.Threading.Thread.Sleep(2000);

        if (context.Request.Form["name"] != null)
        {
            context.Response.Write("POST Info : name->" + context.Request.Form["name"] + "->" + DateTime.Now.ToString());
        }
        else
        {
            context.Response.Write("request incorrect.");
        }
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}