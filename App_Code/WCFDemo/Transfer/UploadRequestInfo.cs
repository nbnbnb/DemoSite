﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Web;


namespace WCFDemo
{
    // 默认为类型名
   [MessageContract(WrapperName = "DoUpload")]
    public class UploadRequestInfo : IDisposable
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