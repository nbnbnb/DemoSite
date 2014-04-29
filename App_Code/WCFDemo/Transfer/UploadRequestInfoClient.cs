using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace WCFDemo
{

    // WrapperName属性一定要与服务器端的对应
    // 默认为服务端类型名
    [MessageContract(WrapperName = "DoUpload")]
    public class UploadRequestInfoClient
    {
        [MessageHeader(MustUnderstand = true)]
        public string FilePath;

        [MessageHeader(MustUnderstand = true)]
        public long Length;

        [MessageBodyMember(Order = 1)]
        public Stream FileByteStream;

    }
}
