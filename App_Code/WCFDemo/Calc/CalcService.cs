using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WCFDemo
{
    [ServiceBehavior(InstanceContextMode=InstanceContextMode.Single)]
    public class CalcService : ICalcService
    {
        public int Add(int a, int b)
        {
            //File.WriteAllText(@"C:\log.txt", OperationContext.Current.SessionId);
            return a + b;
        }

        public int Subtraction(int a, int b)
        {
            return a - b;
        }
    }
}
