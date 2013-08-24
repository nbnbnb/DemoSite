using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.MVP.PV
{
    public interface IEmployeeSearchView
    {
        IEnumerable<String> Departments { set; }

        String SelectedDepartment { get; }

        IEnumerable<Employee> Employees { set; }

        event EventHandler<DepartmentSelectedEventArgs> DepartmentChanged;
    }
}