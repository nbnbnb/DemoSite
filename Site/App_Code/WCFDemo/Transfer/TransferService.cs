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
    public class TransferService : ITransferService
    {
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
                /* 全部加载到内存中进行执行
                   安全释放句柄
                using (var fs = File.OpenRead(filePath))
                {
                    result.FileByteStream = new MemoryStream();
                    fs.CopyTo(result.FileByteStream, 4096);
                }
                */

                // 使用文件流方式
                // 问题是不能释放文件句柄 !!!!!!!
                result.FileByteStream = File.OpenRead(filePath);
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
