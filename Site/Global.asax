<%@ Application Language="C#" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        // 在应用程序启动时运行的代码

        // 设置 SQL 缓存失效(SQL 2005 基于通知机制)
        // 在执行某次查询之前，必须调用此方法，才会使SQL 缓存失效期作用(放在Application_Start中比较合适)
        // System.Data.SqlClient.SqlDependency.Start(ConfigurationManager.ConnectionStrings["TestDBConnectionString"].ConnectionString);

        log4net.Config.XmlConfigurator.Configure();
    }

    void Application_End(object sender, EventArgs e) 
    {
        //  在应用程序关闭时运行的代码

    }

    void Application_Error(object sender, EventArgs e) 
    { 
        // 在出现未处理的错误时运行的代码
        
        /*
        // 如果在此方法中没有处理异常，最终将会把异常丢给web.config中的配置进行错误页面重定向
        var error = Server.GetLastError();
        if (error.GetBaseException() is NullReferenceException)
        {
            // 处理一个特别类型的异常
            System.Diagnostics.Trace.Write("在 Application Error 中捕获了一个特定的异常");

            // 记录日志，跳转到首页
            Response.Redirect("/");
        }
        // 将其他的异常，留给web.config配置文件，进行重定向
       * **/
    }

    void Session_Start(object sender, EventArgs e) 
    {
        // 在新会话启动时运行的代码
    }

    void Session_End(object sender, EventArgs e) 
    {
        // 在会话结束时运行的代码。 
        // 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为 InProc 时，才会引发 Session_End 事件。
        // 如果会话模式设置为 StateServer 
        // 或 SQLServer，则不会引发该事件。

    }
       
</script>
