using System.ServiceModel;

namespace DemoSite.WCFDemo.Calc
{
    [System.ServiceModel.ServiceContractAttribute(Namespace = "http://www.zhangjin.me/WCFDemo", ConfigurationName = "CalcService")]
    public interface ICalcServiceClient
    {
        [System.ServiceModel.OperationContractAttribute(Action = "http://www.zhangjin.me/WCFDemo/CalcService/Add",
            ReplyAction = "http://www.zhangjin.me/WCFDemo/CalcService/AddResponse")]
        int Add(int a, int b);

        [System.ServiceModel.OperationContractAttribute(Action = "http://www.zhangjin.me/WCFDemo/CalcService/Subtraction",
            ReplyAction = "http://www.zhangjin.me/WCFDemo/CalcService/SubtractionResponse")]
        int Subtraction(int a, int b);
    }

    public partial class CalcServiceClient : ClientBase<ICalcServiceClient>, ICalcServiceClient
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