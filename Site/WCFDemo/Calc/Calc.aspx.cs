using DemoSite.WCFDemo.Calc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WCFDemo_Index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HTTP_Add.Click += HTTP_Add_Click;  // Do With Http
        TCP_Add.Click += TCP_Add_Click; // Do With TCP
        NamedPipe_Add.Click += NamedPipe_Add_Click; // Do With NamedPipe
    }

    void HTTP_Add_Click(object sender, EventArgs e)
    {
        using (CalcServiceClient client = new CalcServiceClient("BasicHttpBinding_CalcService"))
        {
            client.Open();
            int res = client.Add(GetA(), GetB());
            ClientShow(res, client.InnerChannel.SessionId);
        }
    }

    void TCP_Add_Click(object sender, EventArgs e)
    {
        using (CalcServiceClient client = new CalcServiceClient("NetTcpBinding_CalcService"))
        {
            client.Open();
            ClientShow(client.Add(GetA(), GetB()), client.InnerChannel.SessionId);
        }
    }

    void NamedPipe_Add_Click(object sender, EventArgs e)
    {
        using (CalcServiceClient client = new CalcServiceClient("NamedPipeBinding_CalcService"))
        {
            client.Open();
            ClientShow(client.Add(GetA(), GetB()), client.InnerChannel.SessionId);
        }
    }

    void ClientShow(int res, string sessionId)
    {
        ClientScript.RegisterStartupScript(
            this.GetType(),
            Guid.NewGuid().ToString(),
            String.Format("alert('{0}->{1}')", res, sessionId ?? "null"), true);
    }

    private int GetA()
    {
        return int.Parse(TextBox_A.Text.Trim());
    }

    private int GetB()
    {
        return int.Parse(TextBox_B.Text.Trim());
    }
}