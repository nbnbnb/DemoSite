using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.MVP.PV
{
    public class EmployeeSearchPresenter
    {
        private readonly static IEnumerable<Employee> _employees;

        private readonly static IEnumerable<String> _departments;

        private IEmployeeSearchView _view;

        static EmployeeSearchPresenter()
        {
            _employees = new[]{
                new Employee{ Name="A",Address="AAA"},
                new Employee{ Name="B",Address="BBB"},
                new Employee{ Name="C",Address="CCC"},
                new Employee{ Name="D",Address="DDD"}
            };

            _departments = new[]{
                "All","A","B","C","D"
            };
            
        }

        public EmployeeSearchPresenter(IEmployeeSearchView view)
        {
            _view = view;

            // Bind View Events
            _view.DepartmentChanged += view_DepartmentChanged;
        }

        public void Init()
        {           
            // Bind Default Values
            _view.Departments = _departments;
            _view.Employees = _employees;
        }

        void view_DepartmentChanged(object sender, DepartmentSelectedEventArgs e)
        {
            _view.Employees = GetEmployees(_view.SelectedDepartment);   
        }

        private IEnumerable<Employee> GetEmployees(String name = "All")
        {
            if (name == "All")
            {
                return _employees;
            }
            else
            {
                return _employees.Where(m => m.Name == name);
            }
        }

    }
}