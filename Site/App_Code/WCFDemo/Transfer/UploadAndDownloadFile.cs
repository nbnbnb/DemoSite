using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace DemoSite.WCFDemo.Transfer
{
    // 默认为类型名
    [MessageContract(WrapperName = "DoUpload")]
    public class UploadAndDownloadFile : IDisposable
    {
        [MessageHeader(MustUnderstand = true)]
        public string FilePath;

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