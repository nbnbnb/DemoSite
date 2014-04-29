using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;


namespace WCFDemo
{
    // 默认为类型名
    [MessageContract(WrapperName = "DoDownload")]
    public class DownloadRequestInfo
    {
        [MessageHeader]
        public string FilePath;
    }
}