using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.MVP.SC
{
    public class EmployeeSearchPresenter
    {
        public IEmployeeSearchView View { get; private set; }

        public EmployeeRepository Repository { get; private set; }

        public EmployeeSearchPresenter(IEmployeeSearchView view)
        {
            this.View = view;
            this.Repository = new EmployeeRepository();
            this.View.DepartmentSelected += OnDepartmentSelected;
        }

        public void Init()
        {
            this.View.BindEmployees(this.Repository.GetEmployees());
            this.View.BindDepartments(new[] { "All", "A", "B", "C", "D" });
        }

        protected void OnDepartmentSelected(object sender, DepartmentSelectedEventArgs e)
        {
            this.View.BindEmployees(this.Repository.GetEmployees(e.Department));
        }
    }
}