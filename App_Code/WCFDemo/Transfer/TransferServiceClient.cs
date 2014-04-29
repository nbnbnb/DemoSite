using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace WCFDemo
{
    public class TransferServiceClient : ClientBase<ITransferServiceClient>, ITransferServiceClient
    {
        public TransferServiceClient(string endpointConfigurationName) :
            base(endpointConfigurationName)
        {
        }

        public UploadRequestInfoClient DownloadFileClient(DownloadRequestInfoClient request)
        {
            return base.Channel.DownloadFileClient(request);
        }

        public void UploadFileClient(UploadRequestInfoClient request)
        {
            base.Channel.UploadFileClient(request);
        }
    }

}