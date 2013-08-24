using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DemoSite.MVP.PV;

public partial class MVP_PV_EmployeeSearchView : System.Web.UI.Page,IEmployeeSearchView
{
    private EmployeeSearchPresenter _presenter;

    public MVP_PV_EmployeeSearchView()
    {
        _presenter = new EmployeeSearchPresenter(this);
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            _presenter.Init();
        }

        DropDownListDepartments.SelectedIndexChanged += DropDownListDepartments_SelectedIndexChanged;
    }

    void DropDownListDepartments_SelectedIndexChanged(object sender, EventArgs e)
    {
        if (null != DepartmentChanged)
        {
            DepartmentChanged(sender, new DepartmentSelectedEventArgs(DropDownListDepartments.SelectedValue));
        }
    }

    public IEnumerable<string> Departments
    {
        set
        {
            this.DropDownListDepartments.DataSource = value;
            this.DropDownListDepartments.DataBind();
        }
    }

    public string SelectedDepartment
    {
        get
        {
            return this.DropDownListDepartments.SelectedValue;
        }
    }

    public IEnumerable<Employee> Employees
    {
        set
        {
            this.GridViewEmployees.DataSource = value;
            this.GridViewEmployees.DataBind();
        }
    }

    public event EventHandler<DepartmentSelectedEventArgs> DepartmentChanged;
}