using DemoSite.WCFDemo.Transfer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WCFDemo_FileTransfer : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Button_Download.Click += Button_Download_Click;
        Button_Upload.Click += Button_Upload_Click;
    }

    void Button_Upload_Click(object sender, EventArgs e)
    {
        Upload();
    }

    void Button_Download_Click(object sender, EventArgs e)
    {
        Download();
    }

    private void Download()
    {

        // 如果文件在服务器上，可以直接使用下面的方法，进行文件下载
        // 直接向 HTTP 流输出响应，而不在内存中缓存它
        // Response.TransmitFile("file");
        try
        {
            TransferServiceClient proxy = new TransferServiceClient("basicHttpUpload");

            String fileName = TextBox_FileName.Text;

            DownloadRequestInfoClient requestInfo =
                new DownloadRequestInfoClient
                {
                    FilePath = Path.Combine(Server.MapPath("~/TempFiles"), fileName)
                };

            UploadRequestInfoClient fileInfo = proxy.DownloadFileClient(requestInfo);

            Response.BufferOutput = false;   // to prevent buffering 

            Response.Clear();
            Response.ClearHeaders();
            Response.ContentType = "application/octet-stream";
            // 注意：需要编码文件名，避免乱码问题
            // 但是 Firefox 会乱码！！！
            Response.AddHeader("Content-Disposition", "attachment; filename=" + Server.UrlEncode(fileName));

            int size = 1024 * 10;  // 10 KB
            byte[] buffer = new byte[size];

            while (size > 0)
            {
                // 此次读取了多少字节
                size = fileInfo.FileByteStream.Read(buffer, 0, buffer.Length);

                // Verify that the client is connected.
                if (Response.IsClientConnected)
                {
                    Response.OutputStream.Write(buffer, 0, size);

                    Response.Flush();
                }
                else
                {
                    break;
                }
            }

            Response.End();

        }
        catch (Exception ex)
        {
            // Trap the error, if any.
            Response.Write("Error : " + ex.Message);
        }
        finally
        {
            Response.End();
            Response.Close();
        }
    }

    private void Upload()
    {
        if (FileUpload1.HasFile)
        {
            TransferServiceClient clientUpload = new TransferServiceClient("basicHttpUpload");
            UploadRequestInfoClient uploadRequestInfo = new UploadRequestInfoClient
            {
                FilePath = Path.Combine(Server.MapPath("~/TempFiles"), FileUpload1.FileName),
                Length = FileUpload1.PostedFile.InputStream.Length,
                FileByteStream = FileUpload1.PostedFile.InputStream
            };

            clientUpload.UploadFileClient(uploadRequestInfo);

        }
    }
}