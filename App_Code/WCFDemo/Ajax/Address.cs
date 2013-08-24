using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WCFDemo
{
    [DataContract]
    public class Address
    {
        [DataMember]
        public string Country { get; set; }

        [DataMember]
        public string Province { get; set; }

        [DataMember]
        public string City { get; set; }
    }
}