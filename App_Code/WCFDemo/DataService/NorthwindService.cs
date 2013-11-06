//------------------------------------------------------------------------------
// <copyright file="WebDataService.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------
using System;
using System.Data.Services;
using System.Data.Services.Common;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Web;

namespace DemoSite.WCFDemo.DataService
{

    public class NorthwindService : DataService<NorthwindEntities>
    {
        // This method is called only once to initialize service-wide policies.
        public static void InitializeService(DataServiceConfiguration config)
        {
            // TODO: set rules to indicate which entity sets and service operations are visible, updatable, etc.
            // Examples:
            // config.SetEntitySetAccessRule("MyEntityset", EntitySetRights.AllRead);
            // config.SetServiceOperationAccessRule("MyServiceOperation", ServiceOperationRights.All);

            config.SetEntitySetAccessRule("DemoSite.Northwind.LinqToSQL.Entities.Orders", EntitySetRights.AllRead);
            config.SetEntitySetAccessRule("DemoSite.Northwind.LinqToSQL.Entities.Products", EntitySetRights.AllRead);

            config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V3;
        }
    }
}
