using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DemoSite.Northwind.LinqToSQL.Entities;
using DemoSite.Northwind.LinqToSQL;

namespace DemoSite.WCFDemo.DataService
{
    public class NorthwindEntities
    {
        private static IList<Orders> _orders;
        private static IList<Products> _products;

        static NorthwindEntities()
        {
            NorthwindDataContext context = new NorthwindDataContext();
            _orders = context.Orders.ToList();
            _products = context.Products.ToList();
        }

        public IQueryable<Orders> Orders
        {
            get { return _orders.AsQueryable<Orders>(); }
        }

        public IQueryable<Products> Products
        {
            get { return _products.AsQueryable<Products>(); }
        }

    }
}