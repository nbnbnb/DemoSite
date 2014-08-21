<%@ WebHandler Language="C#" Class="GetID" %>

using System;
using System.Web;

public class GetID : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";

        System.Threading.Thread.Sleep(1000);

        context.Response.Write(1);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}