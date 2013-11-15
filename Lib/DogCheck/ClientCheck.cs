using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DogCheck
{
    public class ClientCheck : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            string result = "false";

            string key = context.Request.QueryString["key"];
            string value = context.Request.QueryString["value"];
            if (!string.IsNullOrEmpty(key) || !string.IsNullOrEmpty(value))
            {
                SoftKey dog = new SoftKey();
                // 服务器端进行计算
                string res = dog.StrEnc(key, "7629637A551D5C04F401954287E5DEDD");

                if (res.Equals(value, StringComparison.Ordinal))
                {
                    result = "true";
                }
            }

            context.Response.Write(result);


        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }
}
