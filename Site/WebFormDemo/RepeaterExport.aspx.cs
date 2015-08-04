using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_RepeaterExport : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        SubscribeForEvents();

        if (!IsPostBack)
        {
            BindRepeater();
        }
    }

    private void SubscribeForEvents()
    {
        Button_Export.Click += Button_Export_Click;
    }

    private void Button_Export_Click(object sender, EventArgs e)
    {
        Export();
    }

    private void BindRepeater()
    {
        List<PageEntity> source = new List<PageEntity>();
        source.Add(new PageEntity
        {
            UserName = "NBZhang",
            UserAge = 28
        });
        source.Add(new PageEntity
        {
            UserName = "BTKing",
            UserAge = 30
        });

        Repeater_Main.DataSource = source;
        Repeater_Main.DataBind();
    }

    private void Export()
    {
        using (StringWriter writer = new StringWriter())
        {
            using (HtmlTextWriter htmlWriter = new HtmlTextWriter(writer))
            {
                Repeater_Main.RenderControl(htmlWriter);
            }

            string content = writer.ToString();
            string fileName = "abc";
            var response = Response;
            response.Clear();
            response.AddHeader("content-disposition", string.Format("attachment; filename={0}.xls", HttpUtility.UrlEncode(Encoding.UTF8.GetBytes(fileName))));
            response.ContentType = "application/vnd.ms-excel";
            response.Charset = "GB2312";
            response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");

            response.Write(string.Format(@"<html><head><meta http-equiv=Content-Type content=""text/html; charset=GB2312""><style>{0}</style></head><body>", ""));
            response.Write(content);
            response.Write("");
            response.Write("</body></html>");
            response.Flush();

            response.End();
        }
    }

    private class PageEntity
    {
        public string UserName { get; set; }

        public int UserAge { get; set; }
    }
}