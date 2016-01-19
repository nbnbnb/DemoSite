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
        String fileName = TextBox_FileName.Text;

        if (String.IsNullOrWhiteSpace(fileName))
        {
            return;
        }

        // 如果文件在服务器上，可以直接使用下面的方法，进行文件下载
        // 直接向 HTTP 流输出响应，而不在内存中缓存它
        // Response.TransmitFile("file");
        try
        {
            TransferServiceClient proxy = new TransferServiceClient("basicHttpUpload");
            DownloadRequest requestInfo =
                new DownloadRequest
                {
                    FilePath = Path.Combine(Server.MapPath("~/TempFiles"), fileName)
                };

            UploadAndDownloadFile fileInfo = proxy.DownloadFile(requestInfo);

            Response.Clear();
            Response.ClearHeaders();
            Response.ContentType = "application/octet-stream";
            // 注意：需要编码文件名，避免乱码问题
            // 但是 Firefox 会乱码！！！
            if (Request.Browser.IsBrowser("InternetExplorer"))
            {
                fileName = Server.UrlEncode(fileName);
            }
            Response.AddHeader("Content-Disposition", "attachment; filename=" + fileName);
            int size = 1024 * 10;  // 10 KB
            byte[] buffer = new byte[size];
            while (size > 0)
            {
                // 读取文件流到缓冲区
                size = fileInfo.FileByteStream.Read(buffer, 0, buffer.Length);
                if (Response.IsClientConnected)
                {
                    // 写入 HTTP 流
                    Response.OutputStream.Write(buffer, 0, size);
                    Response.Flush();
                }
                else
                {
                    break;
                }
            }

            // 关闭代理，保证服务也关闭
            (proxy as IDisposable).Dispose();

            Response.End();
        }
        catch (Exception ex)
        {
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
        if (FileUpload_Main.HasFile)
        {
            TransferServiceClient clientUpload = new TransferServiceClient("basicHttpUpload");
            UploadAndDownloadFile uploadRequestInfo = new UploadAndDownloadFile
            {
                FilePath = Path.Combine(Server.MapPath("~/TempFiles"), FileUpload_Main.FileName),
                Length = FileUpload_Main.PostedFile.InputStream.Length,
                FileByteStream = FileUpload_Main.PostedFile.InputStream
            };
            clientUpload.UploadFile(uploadRequestInfo);
        }
    }
}