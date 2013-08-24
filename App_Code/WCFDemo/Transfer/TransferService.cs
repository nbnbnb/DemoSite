using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web;

namespace WCFDemo
{
    public class TransferService : ITransferService
    {
        public RemoteFileInfo DownloadFile(DownloadRequestInfo request)
        {
            RemoteFileInfo result = new RemoteFileInfo();
            try
            {
                string filePath = Path.Combine(@"G:\", request.FileName);
                FileInfo fileInfo = new FileInfo(filePath);

                if (!fileInfo.Exists)
                {
                    throw new FileNotFoundException("File not found", request.FileName);
                }

                FileStream stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                result.FileName = request.FileName;
                result.Length = fileInfo.Length;
                result.FileByteStream = stream;
            }
            catch (UnauthorizedAccessException ex)
            {
                throw new Exception("Download File Error", ex);
            }
            return result;
        }

        public void UploadFile(RemoteFileInfo request)
        {

            string filePath = Path.Combine(@"G:\", request.FileName);

            using (FileStream targetStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                int bufferLen = 65000;
                byte[] buffer = new byte[bufferLen];
                int count = 0;
                while ((count = request.FileByteStream.Read(buffer, 0, bufferLen)) > 0)
                {
                    // save to output stream
                    targetStream.Write(buffer, 0, count);
                }
                request.Dispose();
            }
        }
    }
}
