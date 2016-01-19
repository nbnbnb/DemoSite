using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;


namespace DemoSite.WCFDemo.Transfer
{
    // 默认为类型名
    [MessageContract(WrapperName = "DoDownload")]
    public class DownloadRequest
    {
        [MessageHeader]
        public string FilePath;
    }
}