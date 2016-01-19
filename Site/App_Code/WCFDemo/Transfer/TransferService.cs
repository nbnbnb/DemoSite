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
        public UploadRequestInfo DownloadFile(DownloadRequestInfo request)
        {
            UploadRequestInfo result = new UploadRequestInfo();
            try
            {
                string filePath = request.FilePath;
                FileInfo fileInfo = new FileInfo(filePath);

                if (!fileInfo.Exists)
                {
                    throw new FileNotFoundException("File not found", request.FilePath);
                }

                //using (FileStream stream = File.OpenRead(filePath))
                //{
                //    result.FileName = request.FilePath;
                //    result.Length = fileInfo.Length;
                //    result.FileByteStream = stream;
                //}

                // 注意：此处不能使用上面的方式进行
                // 因为流在客户端接收完成前，不能够关闭

                FileStream stream = File.OpenRead(filePath);

                result.FilePath = request.FilePath;
                result.Length = fileInfo.Length;

                // 客户端将会读取此流对象
                result.FileByteStream = stream;
            }
            catch (UnauthorizedAccessException ex)
            {
                throw new Exception("Download File Error", ex);
            }

            return result;
        }

        public void UploadFile(UploadRequestInfo request)
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
