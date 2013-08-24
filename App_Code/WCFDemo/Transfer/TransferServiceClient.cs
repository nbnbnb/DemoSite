using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace WCFDemo
{

    [ServiceContract]
    public interface ITransferServiceClient
    {

        [OperationContract(Action = "http://tempuri.org/ITransferService/DownloadFile", ReplyAction = "http://tempuri.org/ITransferService/DownloadFileResponse")]
        RemoteFileInfoClient DownloadFileClient(DownloadRequestInfoClient request);

        [OperationContract(Action = "http://tempuri.org/ITransferService/UploadFile", ReplyAction = "http://tempuri.org/ITransferService/UploadFileResponse")]
        void UploadFileClient(RemoteFileInfoClient request);

    }


    [MessageContract(WrapperName = "DownloadRequestInfo")]
    public class DownloadRequestInfoClient
    {
        [MessageHeader]
        public string FileName;
    }

    [MessageContract(WrapperName = "RemoteFileInfo")]
    public class RemoteFileInfoClient
    {
        [MessageHeader(MustUnderstand = true)]
        public string FileName;

        [MessageHeader(MustUnderstand = true)]
        public long Length;

        [MessageBodyMember(Order = 1)]
        public Stream FileByteStream;

    }

    public class TransferServiceClient : ClientBase<ITransferServiceClient>, ITransferServiceClient
    {

        public TransferServiceClient(string endpointConfigurationName) :
            base(endpointConfigurationName)
        {
        }

        public RemoteFileInfoClient DownloadFileClient(DownloadRequestInfoClient request)
        {
            return base.Channel.DownloadFileClient(request);
        }

        public void UploadFileClient(RemoteFileInfoClient request)
        {
            base.Channel.UploadFileClient(request);
        }
    }

}