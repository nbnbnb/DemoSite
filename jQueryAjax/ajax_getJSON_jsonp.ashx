<%@ WebHandler Language="C#" Class="ajax_getJSON_jsonp" %>

using System;
using System.Web;

public class ajax_getJSON_jsonp : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/x-javascript";
        var ser = new System.Web.Script.Serialization.JavaScriptSerializer();
        var person = new Person() { Name = "张Jin", Address = "China Hubei WuHan" };
        // 客户端将会自动的根据()前面的回调方法名进行赋值
        // 因此，客户端必须要有一个 jsonpCallback(data)的回调函数
        
        // 首选获得客户端随机的回调函数名称(是通过get 参数发送过来的)
        var callback_method = context.Request.Params["jsonpCallback"].ToString();
        
        // 根据参数名，执行函数(注意，需要加上括号)
        context.Response.Write(callback_method + string.Format("({0});", ser.Serialize(person)));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}

public class Person
{
    public string Name { get; set; }
    public string Address { get; set; }
}