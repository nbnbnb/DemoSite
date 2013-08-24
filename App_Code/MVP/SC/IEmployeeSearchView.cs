using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.MVP.SC
{
    public interface IEmployeeSearchView
    {
        void BindEmployees(IEnumerable<Employee> employees);
        void BindDepartments(IEnumerable<String> departments);
        event EventHandler<DepartmentSelectedEventArgs> DepartmentSelected;
    }
}