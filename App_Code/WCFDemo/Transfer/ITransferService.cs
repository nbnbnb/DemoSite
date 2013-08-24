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
        RemoteFileInfo DownloadFile(DownloadRequestInfo request);

        [OperationContract]
        void UploadFile(RemoteFileInfo request);
    }

    [MessageContract]
    public class DownloadRequestInfo
    {
        [MessageHeader]
        public string FileName;
    }

    [MessageContract]
    public class RemoteFileInfo : IDisposable
    {
        [MessageHeader(MustUnderstand = true)]
        public string FileName;

        [MessageHeader(MustUnderstand = true)]
        public long Length;

        [MessageBodyMember(Order = 1)]
        public Stream FileByteStream;

        public void Dispose()
        {
            if (FileByteStream != null)
            {
                FileByteStream.Close();
            }
        }
    }
}
