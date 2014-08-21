[System.ServiceModel.ServiceContractAttribute(Namespace="http://www.zhangjin.me/WCFDemo", ConfigurationName="CalcService")]
public interface ICalcServiceClient
{
    
    [System.ServiceModel.OperationContractAttribute(Action="http://www.zhangjin.me/WCFDemo/CalcService/Add", ReplyAction="http://www.zhangjin.me/WCFDemo/CalcService/AddResponse")]
    int Add(int a, int b);
    
    
    [System.ServiceModel.OperationContractAttribute(Action="http://www.zhangjin.me/WCFDemo/CalcService/Subtraction", ReplyAction="http://www.zhangjin.me/WCFDemo/CalcService/SubtractionResponse")]
    int Subtraction(int a, int b);

}

[System.Diagnostics.DebuggerStepThroughAttribute()]
[System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
public partial class CalcServiceClient : System.ServiceModel.ClientBase<ICalcServiceClient>, ICalcServiceClient
{
    
    public CalcServiceClient()
    {
    }
    
    public CalcServiceClient(string endpointConfigurationName) : 
            base(endpointConfigurationName)
    {
    }
    
    public CalcServiceClient(string endpointConfigurationName, string remoteAddress) : 
            base(endpointConfigurationName, remoteAddress)
    {
    }
    
    public CalcServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
            base(endpointConfigurationName, remoteAddress)
    {
    }
    
    public CalcServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
            base(binding, remoteAddress)
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
