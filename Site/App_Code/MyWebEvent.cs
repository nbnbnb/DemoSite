using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Management;

namespace DemoLib
{
    public class MyWebEvent:WebBaseEvent
    {
        private const int ECODE = WebEventCodes.WebExtendedBase + 1;

        public MyWebEvent(string message, object eventSource)
            : base(message, eventSource, ECODE) { }
    }
}