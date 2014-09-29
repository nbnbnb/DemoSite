<%@ WebHandler Language="C#" Class="ajax_getXML" %>

using System;
using System.Web;

public class ajax_getXML : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/xml";
        context.Response.Write(@"<Person name=""ZhangJin""><City>WuHan</City><Province>HuBei</Province><Country>China</Country></Person>");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}