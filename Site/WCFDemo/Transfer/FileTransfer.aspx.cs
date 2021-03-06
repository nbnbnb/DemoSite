﻿using DemoSite.Helper;
using DemoSite.WCFDemo.Transfer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
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

            Response.Clear();
            Response.ClearHeaders();
            Response.ContentType = "application/octet-stream";

            Response.AddHeader("Content-Disposition", "attachment; filename=" + FileNameHelper.GetDownloadFileName(fileName));

            try
            {
                UploadAndDownloadFile fileInfo = proxy.DownloadFile(requestInfo);
                fileInfo.FileByteStream.CopyTo(Response.OutputStream, 1024 * 100);
                proxy.Close();
            }
            catch (TimeoutException)
            {
                proxy.Abort();
            }
            catch (CommunicationException)
            {
                proxy.Abort();
            }

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