using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Script.Serialization;

namespace WCFDemo
{
    [JavascriptCallbackBehavior(UrlParameterName = "callback")]
    public class AjaxService : IAjaxService
    {
        private UserInfo GetUserInfo(string userName)
        {
            return new UserInfo
            {
                UserName = userName,
                Age = 26,
                UserAddress = new Address
                {
                    Country = "Ching",
                    Province = "HuBei",
                    City = "WuHan"
                }
            };
        }

        public UserInfo GetUserInfoWithGet(string userName)
        {
            return GetUserInfo(userName);
        }

        public UserInfo GetUserInfoWithPost(string userName)
        {
            return GetUserInfo(userName);
        }

        public UserInfo UpdateUserInfoWithPost(UserInfo userInfo)
        {
            userInfo.UserName = userInfo.UserName + "(New)";
            userInfo.Age = userInfo.Age + 1;
            return userInfo;
        }

        public UserInfo GetUserInfoWithJSONP(string userName)
        {
            return GetUserInfo(userName);
        }
    }
}
