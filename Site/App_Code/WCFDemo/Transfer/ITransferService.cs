using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace DemoSite.WCFDemo.Transfer
{
    [ServiceContract]
    public interface ITransferService
    {
        [OperationContract]
        UploadAndDownloadFile DownloadFile(DownloadRequest request);

        [OperationContract]
        void UploadFile(UploadAndDownloadFile request);
    }
}
