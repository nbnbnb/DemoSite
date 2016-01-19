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

        public UploadAndDownloadFile DownloadFile(DownloadRequest request)
        {
            return base.Channel.DownloadFile(request);
        }

        public void UploadFile(UploadAndDownloadFile request)
        {
            base.Channel.UploadFile(request);
        }
    }
}