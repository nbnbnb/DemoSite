using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace DemoSite.WCFDemo.Calc
{
    /// <summary>
    /// Namespace 影响客户端的 ReplyAction 和 Action
    /// </summary>
    [ServiceContract(Name = "CalcService", Namespace = "http://www.zhangjin.me/WCFDemo")]
    public interface ICalcService
    {
        [OperationContract]
        int Add(int a, int b);

        [OperationContract]
        int Subtraction(int a, int b);
    }
}
