using System.ServiceModel;

namespace DemoSite.WCFDemo.Calc
{
    public class CalcServiceClient : ClientBase<ICalcService>, ICalcService
    {
        public CalcServiceClient(string endpointConfigurationName) :
                base(endpointConfigurationName)
        {
        }

        public int Add(int a, int b)
        {
            return base.Channel.Add(a, b);
        }

        public int Subtraction(int a, int b)
        {
            return base.Channel.Subtraction(a, b);
        }
    }
}