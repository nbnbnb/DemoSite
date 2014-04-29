using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;


namespace WCFDemo
{
    // WrapperName属性一定要与服务器端的对应
    // 默认为服务端类型名
    [MessageContract(WrapperName = "DoDownload")]
    public class DownloadRequestInfoClient
    {
        [MessageHeader]
        public string FilePath;
    }
}