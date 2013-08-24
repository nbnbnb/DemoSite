using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Telerik.Web.UI;
using System.IO;

public partial class Telerik_TelerikMain : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // 注意，注册事件时，需要放在对象绑定的前面
        RadTreeView1.NodeDataBound += new Telerik.Web.UI.RadTreeViewEventHandler(RadTreeView1_NodeDataBound);

        // 触发
        RadTreeView1.NodeClick += new RadTreeViewEventHandler(RadTreeView1_NodeClick);

        if (!IsPostBack)
        {
            BindTreeView();
        }

    }

    void RadTreeView1_NodeClick(object sender, RadTreeNodeEventArgs e)
    {
        var item = e.Node as RadTreeNode;

        if (item.Level == 1)
        {
            RadPane_Nav.ContentUrl = "";
        }        
        else if (item.Level==2)  // 如果使用了 AjaxManager,此处无法用 ID来标识对象，就是内置的 Level也行
        {
            

            // 组合文件路径
            //item.FullPath
            //"Telerik Controls/Single/RadAsyncUpload"

            //Request.Url.AbsoluteUri
            //"http://localhost:5656/Telerik/TelerikMain.aspx"

            string nav_url = Request.Url.AbsoluteUri.Substring(0, Request.Url.AbsoluteUri.LastIndexOf("/")) + item.FullPath.Substring(item.FullPath.IndexOf("/"))+".aspx";
            RadPane_Nav.ContentUrl = nav_url;

            // 不能用 ClientScript.RegisterStartupScript来注册客户端脚本对象
            //ClientScript.RegisterStartupScript(this.GetType(), "smmmmmm1", "alert('oj');", true);
            // 可以用 RadAjaxManager的 ResponseScripts对象进行注册
            //RadAjaxManager1.ResponseScripts.Add("alert('ok')");
        }
    }

    void RadTreeView1_NodeDataBound(object sender, Telerik.Web.UI.RadTreeNodeEventArgs e)
    {
        var item = e.Node as RadTreeNode;

        if (item.ParentNode == null)
        {
            item.Expanded = true;
            item.Font.Bold = true;
            item.Font.Size = 13;
        }
        else if (item.ParentNode.ID == "1")  // 默认只展开前两个节点 (根节点，和第一级节点)
        {
            item.Expanded = true;
        }
    }

    private void BindTreeView()
    {
        // 将目录下的文件结构 绑定到 TreeView 中
        string path = Server.MapPath("/Telerik/");

        // 存储目录结构信息
        List<TelerikDataItem> items = new List<TelerikDataItem>();

        // 设置每个节点的 ID
        int id = 1;

        // 设置唯一一个父节点
        items.Add(new TelerikDataItem(id, 0, "Telerik Controls"));

        DirectoryInfo root = new DirectoryInfo(path);

        // 获取所以的文件夹信息
        DirectoryInfo[] dir_infos = root.GetDirectories();
        foreach (DirectoryInfo info in dir_infos)
        {
            id++;

            items.Add(new TelerikDataItem(id, 1, info.Name));

            foreach (var file in info.GetFiles())
            {
                // 只获取 aspx 文件
                if (file.Name.EndsWith("aspx"))
                {
                    items.Add(new TelerikDataItem(-1, id, file.Name.Substring(0, file.Name.IndexOf("."))));
                }
            }

        }

        RadTreeView1.DataSource = items;
        RadTreeView1.DataFieldID = "ID";
        RadTreeView1.DataFieldParentID = "ParentID";
        RadTreeView1.DataTextField = "Text";
        RadTreeView1.DataBind();

    }

    internal class TelerikDataItem
    {
        private string _text;
        private int _id;
        private int _parentId;

        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }


        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        public int ParentID
        {
            get { return _parentId; }
            set { _parentId = value; }
        }

        public TelerikDataItem(int id, int parentId, string text)
        {
            _id = id;
            _parentId = parentId;
            _text = text;
        }
    }
}