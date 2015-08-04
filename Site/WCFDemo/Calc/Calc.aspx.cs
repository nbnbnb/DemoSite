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
        Button_Add.Click += Button_Add_Click;  // Do With Http
        Button_Substraction.Click += Button_Substraction_Click; // Do With TCP
        Button_Add2.Click += Button_Add2_Click; // Do With NamedPipe
    }

    void Button_Add2_Click(object sender, EventArgs e)
    {
        using (CalcServiceClient client = new CalcServiceClient("NamedPipeBinding_CalcService"))
        {
            ClientShow(client.Add(GetA(), GetB()), client.InnerChannel.SessionId);
        }
    }

    void Button_Substraction_Click(object sender, EventArgs e)
    {
        using (CalcServiceClient client = new CalcServiceClient("NetTcpBinding_CalcService"))
        {
            ClientShow(client.Subtraction(GetA(), GetB()), client.InnerChannel.SessionId);
        }
    }

    void Button_Add_Click(object sender, EventArgs e)
    {
        using (CalcServiceClient client = new CalcServiceClient("BasicHttpBinding_CalcService"))
        {
            client.Open();
            int res = client.Add(GetA(), GetB());
            ClientShow(res, client.InnerChannel.SessionId);
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