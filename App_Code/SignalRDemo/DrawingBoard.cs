using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;


namespace DemoSite.SignalRDemo
{
    // 由于此处使用了命名空间
    // 所以需要显式地进行名称设置
    // 此设置需要与客户端一致
    // * 框架不会对设置的名称应用驼峰规则进行改写 *
    [HubName("drawingBoard")]
    public class DrawingBoard : Hub
    {
        public Task BroadcastPoint(float x, float y)
        {
            // 使用  Clients.Caller.color 来获得客户端的附加数据
            return Clients.Others.drawPoint(x, y, Clients.Caller.color);
        }

        public Task BroadcastClear()
        {
            return Clients.Others.clear();
        }
    }

}