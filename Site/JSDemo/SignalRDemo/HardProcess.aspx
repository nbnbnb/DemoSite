<%@ Page Language="C#"
    Inherits="System.Web.UI.Page" EnableSessionState="false" %>

<%@ Import Namespace="System.Threading" %>
<%@ Import Namespace="Microsoft.AspNet.SignalR" %>
<%
    Response.Expires = -1;
    var connectionId = Request["connId"];
    var hub = GlobalHost.ConnectionManager
        .GetHubContext<DemoSite.SignalRDemo.ProgressBar>();
    // Simulate a very hard process...
    for (int i = 1; i <= 100; i++)
    {
        // 回调客户端方法
        // 对于高版本浏览器使用 WebSocket
        hub.Clients.Client(connectionId).update(i);
        Thread.Sleep(150);
    }
%>
<p><%: DateTime.Now.ToShortTimeString() %></p>
<p>The answer to life, the universe and everything is: 42.</p>
