using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WCFDemo.Operate
{
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class OperateService : IOperateService
    {
        private static List<IDoWorkCallback> _callbacks = new List<IDoWorkCallback>();

        public void DoWork()
        {
            //...
        }

        public static void CallClients()
        {
            _callbacks.ForEach((cb) => { cb.OnCallback(); });
        }


        public void Connect()
        {
            IDoWorkCallback callback = OperationContext.Current.GetCallbackChannel<IDoWorkCallback>();
            if (_callbacks.Contains(callback) == false)
            {
                _callbacks.Add(callback);
            }
        }

        public void Disconnect()
        {
            IDoWorkCallback callback = OperationContext.Current.GetCallbackChannel<IDoWorkCallback>();

            if (_callbacks.Contains(callback) == true)
            {
                _callbacks.Remove(callback);
            }
            else
            {
                throw new InvalidOperationException("Can't find callback");
            }
        }
    }
}
