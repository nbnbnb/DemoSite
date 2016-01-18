using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace DemoSite.WCFDemo.Calc
{
    [ServiceContract(Name = "CalcService", Namespace = "http://www.zhangjin.me/WCFDemo")]
    public interface ICalcService
    {
        [OperationContract]
        int Add(int a, int b);

        [OperationContract]
        int Subtraction(int a, int b);
    }
}
