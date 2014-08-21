using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.MVP.SC
{
    public class EmployeeRepository
    {
        private readonly static IEnumerable<Employee> _employees;

        static EmployeeRepository()
        {
            _employees = new[]{
                new Employee{ Name="A",Address="AAA"},
                new Employee{ Name="B",Address="BBB"},
                new Employee{ Name="C",Address="CCC"},
                new Employee{ Name="D",Address="DDD"}
            };
        }

        public IEnumerable<Employee> GetEmployees(String name = "All")
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