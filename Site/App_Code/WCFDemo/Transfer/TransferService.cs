using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web;

namespace DemoSite.WCFDemo.Transfer
{

    /// <summary>
    /// 由于服务使用的是单调模式，每个服务调用都会导致服务实例的创建
    /// 当操作方法执行完后，Dispose 方法会自动执行以实现对服务实例的释放
    /// 最终的服务实例将会变成垃圾对象，并被 GC 回收
    /// </summary>
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class TransferService : ITransferService, IDisposable
    {
        FileStream _fs = null;

        public void Dispose()
        {
            if (_fs != null)
            {
                _fs.Close();
            }
        }

        public UploadAndDownloadFile DownloadFile(DownloadRequest request)
        {
            UploadAndDownloadFile result = new UploadAndDownloadFile();
            try
            {
                string filePath = request.FilePath;
                FileInfo fileInfo = new FileInfo(filePath);

                if (!fileInfo.Exists)
                {
                    throw new FileNotFoundException("File not found", request.FilePath);
                }

                // 注意：此处不能使用上面的方式进行
                // 因为流在客户端接收完成前，不能够关闭
                // 所以此处将对象放在了内存中
                result.FilePath = request.FilePath;
                result.Length = fileInfo.Length;
                _fs = File.OpenRead(filePath);
                result.FileByteStream = _fs;

            }
            catch (UnauthorizedAccessException ex)
            {
                throw new Exception("Download File Error", ex);
            }

            return result;
        }

        public void UploadFile(UploadAndDownloadFile request)
        {
            using (FileStream targetStream = File.OpenWrite(request.FilePath))
            {
                // 推荐写法
                // 分片拷贝字节流
                request.FileByteStream.CopyTo(targetStream, 4096);

                // 与上面的效果一致
                /*
                int size = 1024 * 4;
                byte[] buf = new byte[size];
                size = request.FileByteStream.Read(buf, 0, size);
                while (size > 0)
                {
                    targetStream.Write(buf, 0, size);
                    size = request.FileByteStream.Read(buf, 0, size);
                }
                **/
            }
        }
    }
}
