using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace DemoSite.WCFDemo.Transfer
{
    public class TransferServiceClient : ClientBase<ITransferService>, ITransferService
    {
        public TransferServiceClient(string endpointConfigurationName) :
            base(endpointConfigurationName)
        {
        }

        public UploadRequestInfo DownloadFile(DownloadRequestInfo request)
        {
            return base.Channel.DownloadFile(request);
        }

        public void UploadFile(UploadRequestInfo request)
        {
            base.Channel.UploadFile(request);
        }
    }
}