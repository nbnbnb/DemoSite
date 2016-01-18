/*
•An IIS handler for node.js must be registered in web.config to designate the hello.js file as a node.js application. This allows other *.js files in this web application to be served by IIS as static client side JavaScript files.
•The node.js listen address must be specified as 'process.env.PORT' when starting the listener. When an application is hosted in IIS, the web server controls the base address of the application, which is provided to the node process via an environment variable. 
•node.js applications can exist side by side with other content types: HTML files, client side JavaScript files, ASP.NET, PHP, WCF, ...

Visit：http://localhost:9999/Node/hello.js
Result：Hello, world! [helloworld sample; iisnode version is 0.2.16, node version is v0.10.30] , Port: \\.\pipe\9f711b87-17c5-4113-b9b3-37b0e17a3011

在 Web.config 中配置 Node.js 的 Handler
Node.js 的监听端口必须设置为 process.env.PORT
Node.js 应用程序可以和其他内容共存，如 HTML，客户端 js ASP.NET，PHP，WCF

console.log 的日志【包括任何的 stdout 和 stderr output】
http://localhost:9999/Node/iisnode/index.html

*/

var http = require('http');

http.createServer(function (req, res) {
    console.log('A new request arrived with HTTP headers: ' + JSON.stringify(req.headers));
    res.writeHead(200, { 'ContentType': 'text/html' });
    res.end('Hello, world! [helloworld sample; iisnode version is '
          + process.env.IISNODE_VERSION + ', node version is '
          + process.version + ']'
          + ' , Port: ' + process.env.PORT); // Node.js 的监听端口必须设置为 process.env.PORT，此处为命名管道
}).listen(process.env.PORT);

console.log('Application has started at location ' + process.env.PORT);