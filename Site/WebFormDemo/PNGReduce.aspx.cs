using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_PNGReduce : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Button_DoIt.Click += Button_DoIt_Click;
    }

    void Button_DoIt_Click(object sender, EventArgs e)
    {

        if (!FileUpload_PNG.HasFile)
        {
            return;
        }

        string tempDir = Server.MapPath("~/Temp");
        string uploadDir = Server.MapPath("~/Upload");
        CreateDir(tempDir);
        CreateDir(uploadDir);
        string fileName = FileUpload_PNG.FileName;
        string sourceFile = Path.Combine(tempDir, fileName);  // 将上传的文件保存在临时目录中
        string distFile = Path.Combine(uploadDir, fileName);
        FileUpload_PNG.SaveAs(sourceFile);

        PngQuant(Path.Combine(Server.MapPath("~/Bin"), "pngquant.exe"), sourceFile, distFile);

        // 在页脚注册执行脚本
        ScriptManager.RegisterStartupScript(this, typeof(Page), "png", "alert('上传成功!');", true);
    }


    public void CreateDir(string dir)
    {
        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
    }

    public void PngQuant(string exe, string sourceFile, string outFile)
    {
        string arg = String.Format(@"{2} ""{0}"" --quality 10 --force --output ""{1}""", sourceFile, outFile, exe);
        Process process = new Process();
        process.StartInfo.FileName = "cmd.exe";
        process.StartInfo.UseShellExecute = false;
        process.StartInfo.RedirectStandardInput = true;
        process.StartInfo.RedirectStandardOutput = true;
        process.StartInfo.RedirectStandardError = true;
        process.StartInfo.CreateNoWindow = true;
        process.Start();
        process.StandardInput.WriteLine(arg);
        process.StandardInput.WriteLine("exit");
    }
}