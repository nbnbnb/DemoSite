using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.Handler
{
    /// <summary>
    /// CacheHandler 的摘要说明
    /// </summary>
    public class CacheHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            // context.Response.Cache.SetNoStore();   // 设置此标记后，将不会缓存到硬盘或内存中，每次都会重新请求
            // context.Response.Cache.SetMaxAge(TimeSpan.FromMinutes(1));  // 回车请求时，将不会发起 HTTP 请求  
            // 如果上面都设置了，已  NoStore 为准，不会进行缓存

            // 默认的 Cache-Control: private 表示代理不应该进行缓存
            // 此时的缓存是通过 服务器端的 ETag 或 Last-Modified 来控制的
            //context.Response.Cache.s
            context.Response.Cache.SetETag(DateTime.Now.Ticks.ToString());

            context.Response.ContentType = "text/plain";
            context.Response.Write(DateTime.Now.Ticks);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }
}