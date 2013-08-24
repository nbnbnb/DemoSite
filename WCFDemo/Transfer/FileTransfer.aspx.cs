using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WCFDemo;

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
        try
        {
            TransferServiceClient proxy = new TransferServiceClient("basicHttpUpload");
            DownloadRequestInfoClient requestInfo = new DownloadRequestInfoClient { FileName = "output.rar" };

            RemoteFileInfoClient fileInfo = proxy.DownloadFileClient(requestInfo);

            Response.BufferOutput = false;   // to prevent buffering 
            Response.Clear();
            Response.ClearHeaders();
            Response.ContentType = "application/octet-stream";
            Response.AddHeader("Content-Disposition","attachment; filename=" + requestInfo.FileName);


            byte[] buffer = new byte[6500];
            int bytesRead = fileInfo.FileByteStream.Read(buffer, 0, buffer.Length);
  
            while (bytesRead > 0)
            {
                // Verify that the client is connected.
                if (Response.IsClientConnected)
                {

                    Response.OutputStream.Write(buffer, 0, bytesRead);
                    // Flush the data to the HTML output.
                    Response.Flush();

                    buffer = new byte[6500];
                    bytesRead = fileInfo.FileByteStream.Read(buffer, 0, buffer.Length);

                }
                else
                {
                    bytesRead = -1;
                }
            }
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
            RemoteFileInfoClient uploadRequestInfo = new RemoteFileInfoClient
            {
                FileName = FileUpload1.FileName,
                Length = FileUpload1.PostedFile.InputStream.Length,
                FileByteStream = FileUpload1.PostedFile.InputStream
            };

            clientUpload.UploadFileClient(uploadRequestInfo);

        }
    }
}