<%@ WebHandler Language="C#" Class="GetName" %>

using System;
using System.Web;

public class GetName : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        System.Threading.Thread.Sleep(1500);

        switch (context.Request.Form["UserID"])
        {
            case "1":
                context.Response.Write("ZhangJin");
                break;
            case "2":
                context.Response.Write("张进");
                break;
            default:
                context.Response.Write("NoUser");
                break;
        }
    }


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}