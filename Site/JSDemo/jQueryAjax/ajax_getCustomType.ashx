<%@ WebHandler Language="C#" Class="ajax_getCustomType" %>

using System;
using System.Web;

public class ajax_getCustomType : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "my mycustomtype type";
        context.Response.Write(@"{ ""name"":""Dog Gallery"",""count"":12}");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}