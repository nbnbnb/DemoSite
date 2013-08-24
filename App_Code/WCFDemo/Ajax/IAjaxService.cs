using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace WCFDemo
{

    [ServiceContract]
    public interface IAjaxService
    {
        [OperationContract]
        [WebInvoke(Method = "GET",  // 此处的名字一定要大写
            ResponseFormat = WebMessageFormat.Json)]
        UserInfo GetUserInfoWithGet(string userName);

        [OperationContract]
        [WebInvoke(Method = "POST",  // 此处的名字一定要大写
            ResponseFormat = WebMessageFormat.Json,
            // 对于客户端POST过来的json字符串格式的参数，此处一定需要设置为WrappedRequest
            // 设置为WrappedResponse表示对输出的结果进行了一层封装(JSON格式和XML格式都会添加)
            BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        UserInfo GetUserInfoWithPost(string userName);

        [OperationContract]
        [WebInvoke(Method = "POST",
            BodyStyle = WebMessageBodyStyle.WrappedRequest, // 从客户端得到的为JSON对象
            ResponseFormat = WebMessageFormat.Json)] // 输出到客户端也为JSON格式
        UserInfo UpdateUserInfoWithPost(UserInfo userInfo);  // 此处会自动进行反序列化

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        UserInfo GetUserInfoWithJSONP(string userName);

    }

}