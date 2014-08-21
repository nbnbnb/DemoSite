using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace DemoSite.SignalRDemo
{
    public static class InitManager
    {
        public static void InitRoute()
        {

            RouteTable.Routes.MapConnection<TrackerConnection>(
                name: "tracker",
                url: "/tracker");

            RouteTable.Routes.MapHubs();
        }
    }
}