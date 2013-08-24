using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace WCFDemo.Operate
{

    [ServiceContract(CallbackContract = typeof(IOperateServiceClientCallback))]
    public interface IOperateServiceClient
    {
        [OperationContract(Action = "http://tempuri.org/IOperateService/DoWork", ReplyAction = "http://tempuri.org/IOperateService/DoWorkResponse")]
        void DoWork();

    }
    public interface IOperateServiceClientCallback
    {
        [OperationContract(Action = "http://tempuri.org/IOperateService/OnCallback", ReplyAction = "http://tempuri.org/IOperateService/OnCallbackResponse")]
        void OnCallback();
    }

    public class OperateServiceClient:DuplexClientBase<IOperateServiceClient>,IOperateServiceClient
    {
        public OperateServiceClient(System.ServiceModel.InstanceContext callbackInstance, string endpointConfigurationName) :
            base(callbackInstance, endpointConfigurationName)
        {
        }

        public void DoWork()
        {
            base.Channel.DoWork();
        }
    }

    // 注意此处 客户端是如何实现回调契约的
    // 只要客户端正在等待回调，就不能关闭代理
    // 此处定义为在释放客户端时，关闭代理
    public class MyCallbackClient : IOperateServiceClientCallback, IDisposable
    {
        private OperateServiceClient _proxy;

        public void CallService()
        {
            InstanceContext context = new InstanceContext(this);
            _proxy = new OperateServiceClient(context, "002");
            _proxy.DoWork();
        }

        public void OnCallback()
        {
            // 回调的代码
        }

        public void Dispose()
        {
            if (_proxy != null)
            {
                _proxy.Close();
            }
        }
    }
}