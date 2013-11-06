using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebFormDemo_DynamicGridHeader : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        BindEvent();
        BindSource();
    }

    private void BindEvent()
    {
        GridView_Main.RowDataBound += GridView_Main_RowDataBound;
    }

    void GridView_Main_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.Header)
        {
            for (int i = 0; i < e.Row.Cells.Count; i++)
            {
                e.Row.Cells[i].Text = i.ToString();
                e.Row.Cells[i].Width = (1 + i) * 100;
            }
        }

        if (e.Row.RowIndex % 3 == 0)
        {
            e.Row.BackColor = System.Drawing.Color.Red;
        }

         if (e.Row.RowType == DataControlRowType.DataRow)
         {
             foreach (TableCell cell in e.Row.Cells)
             {
                 DateTime dt;
                 if (DateTime.TryParse(cell.Text,out dt))
                 {
                     cell.Text = dt.ToString("d");  // 格式化自动列生成的日期格式
                 }
             }
         }
        
    }

    private void BindSource()
    {
        GridView_Main.DataSource = GetSource();
        GridView_Main.DataBind();
    }

    private List<Person> GetSource()
    {
        List<Person> persons = new List<Person>();
        persons.Add(new Person
        {
            Name = "ZhangJin",
            Address = "WuHan",
            Age = 26
        });

        persons.Add(new Person
        {
            Name = "张进",
            Address = "武汉",
            Age = 26
        });
        persons.Add(new Person
        {
            Name = "ZhangJin",
            Address = "WuHan",
            Age = 26
        });

        persons.Add(new Person
        {
            Name = "张进",
            Address = "武汉",
            Age = 26
        });
        persons.Add(new Person
        {
            Name = "ZhangJin",
            Address = "WuHan",
            Age = 26
        });

        persons.Add(new Person
        {
            Name = "张进",
            Address = "武汉",
            Age = 26
        });

        return persons;
    }

    private class Person
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public int Age { get; set; }

        public DateTime Birth { get; set; }
    }
}