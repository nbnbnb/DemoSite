using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace DemoSite.WCFDemo.Operate
{
    // 此处不需要标记ServiceContract
    // 因为只要定义为回调契约，就意味着已经有ServiceContract特性了
    public interface IDoWorkCallback
    {
        [OperationContract]
        void OnCallback();
    }
}