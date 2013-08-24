using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DemoSite.MVP.SC;

public partial class MVP_SC_EmployeeSearchView : System.Web.UI.Page,IEmployeeSearchView
{
    public EmployeeSearchPresenter Presenter { get; private set; }

    public MVP_SC_EmployeeSearchView()
    {
        Presenter = new EmployeeSearchPresenter(this);
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            this.Presenter.Init();
        }

        DropDownListDepartments.SelectedIndexChanged += DropDownListDepartments_SelectedIndexChanged;
    }

    void DropDownListDepartments_SelectedIndexChanged(object sender, EventArgs e)
    {
        if (null != this.DepartmentSelected)
        {
            DepartmentSelected(this, new DepartmentSelectedEventArgs(DropDownListDepartments.SelectedValue));
        }
    }

    public void BindEmployees(IEnumerable<Employee> employees)
    {
        this.GridViewEmployees.DataSource = employees;
        this.GridViewEmployees.DataBind();
    }

    public void BindDepartments(IEnumerable<string> departments)
    {
        this.DropDownListDepartments.DataSource = departments;
        this.DropDownListDepartments.DataBind();
    }

    public event EventHandler<DepartmentSelectedEventArgs> DepartmentSelected;
}