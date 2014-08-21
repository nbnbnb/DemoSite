using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WCFDemo
{
    [ServiceContract]
    public interface ITransferService
    {
        [OperationContract]
        UploadRequestInfo DownloadFile(DownloadRequestInfo request);

        [OperationContract]
        void UploadFile(UploadRequestInfo request);
    }
}
