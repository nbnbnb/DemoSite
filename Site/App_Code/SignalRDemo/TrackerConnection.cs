using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;


namespace DemoSite.SignalRDemo
{
    /// <summary>
    /// TrackerConnection 的摘要说明
    /// </summary>
    public class TrackerConnection : PersistentConnection
    {
        protected override System.Threading.Tasks.Task OnReceived(IRequest request, string connectionId, string data)
        {
            return Connection.Broadcast(data, connectionId);
        }
    }

}