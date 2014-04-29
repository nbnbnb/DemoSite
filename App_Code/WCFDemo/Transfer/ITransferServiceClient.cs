using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;


namespace WCFDemo
{
    [ServiceContract]
    public interface ITransferServiceClient
    {

        [OperationContract(Action = "http://tempuri.org/ITransferService/DownloadFile", ReplyAction = "http://tempuri.org/ITransferService/DownloadFileResponse")]
        UploadRequestInfoClient DownloadFileClient(DownloadRequestInfoClient request);

        [OperationContract(Action = "http://tempuri.org/ITransferService/UploadFile", ReplyAction = "http://tempuri.org/ITransferService/UploadFileResponse")]
        void UploadFileClient(UploadRequestInfoClient request);

    }
}