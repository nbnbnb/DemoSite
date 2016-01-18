using DemoSite.Northwind.LinqToSQL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.DB
{
    /// <summary>
    ///MainDB 的摘要说明
    /// </summary>
    public class NorthwindDB
    {
        public static NorthwindDataContext GetNorthwindDB()
        {
            return new NorthwindDataContext();
        }
    }
}
