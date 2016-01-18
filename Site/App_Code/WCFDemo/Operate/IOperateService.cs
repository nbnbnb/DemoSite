using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace DemoSite.WCFDemo.Operate
{
    [ServiceContract(CallbackContract = typeof(IDoWorkCallback))]
    public interface IOperateService
    {
        [OperationContract(IsOneWay = true)]
        void DoWork();

        [OperationContract]
        void Connect();

        [OperationContract]
        void Disconnect();
    }
}