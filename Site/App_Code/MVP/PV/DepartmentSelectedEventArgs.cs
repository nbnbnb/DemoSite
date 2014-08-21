using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.MVP.PV
{
    public class DepartmentSelectedEventArgs:EventArgs
    {
        public String Department { get; private set; }

        public DepartmentSelectedEventArgs(String department)
        {
            this.Department = department;
        }
    }
}