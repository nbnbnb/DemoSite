<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ClientCacheTest.aspx.cs" Inherits="WebFormDemo_ClientCacheTest" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>CacheTest</title>
</head>
<body>
    <form id="form1" runat="server">
        <fieldset>
            <legend>在 Firefox 中通过 Firebug 进行测试</legend>

            <ol>
                <li>客户端第一次请求资源，控制头信息总是 Pragma: no-cache Cache-Control: no-cache</li>
                <li>Response.Cache.SetMaxAge(TimeSpan.FromMinutes(1)) 实现客户端缓存，响应内容为 Cache-Control: private, max-age=60</li>
                <li>Response.Cache.SetNoStore() 不会缓存到硬盘或内存中，每次都会重新请求，响应内容为 Cache-Control: private, no-store</li>
                <li>SetNoStore 的优先级高于 SetMaxAge</li>
                <li>Last-Modified/If-Modified-Since要配合Cache-Control使用</li>
                <li>Etag/If-None-Match也要配合Cache-Control使用</li>
                <li>Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304</li>
                <li>需要设置为 Response.Cache.SetCacheability(HttpCacheability.ServerAndPrivate) 时，Response.Cache.SetETag("abcdefg") 才有作用 【或者手动添加】</li>
                <li>ASP.NEt Etag 设置：http://jagbarcelo.blogspot.jp/2009/03/conditional-get-and-etag-implementation.html</li>
                <li>可以在页面加载时判断 Header 中的 ETag 标记，从而决定是响应 304 ，还是重新生成新的内容</li>
            </ol>

            <table cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td width="189">
                            <p><b>用户操作</b></p>
                        </td>
                        <td width="189">
                            <p><b>Expires/Cache-Control</b></p>
                        </td>
                        <td width="189">
                            <p><b>Last-Modified/Etag</b></p>
                        </td>
                    </tr>
                    <tr>
                        <td width="189">
                            <p><b>地址栏回车</b></p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                    </tr>
                    <tr>
                        <td width="189">
                            <p><b>页面链接跳转</b></p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                    </tr>
                    <tr>
                        <td width="189">
                            <p><b>新开窗口</b></p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                    </tr>
                    <tr>
                        <td width="189">
                            <p><b>前进、后退</b></p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                    </tr>
                    <tr>
                        <td width="189">
                            <p><b>F5</b><b>刷新</b></p>
                        </td>
                        <td width="189">
                            <p>无效</p>
                        </td>
                        <td width="189">
                            <p>有效</p>
                        </td>
                    </tr>
                    <tr>
                        <td width="189">
                            <p><b>Ctrl+F5</b><b>刷新</b></p>
                        </td>
                        <td width="189">
                            <p>无效</p>
                        </td>
                        <td width="189">
                            <p>无效</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </fieldset>
        <div>
            <%= ServerTime %>
        </div>
    </form>
</body>
</html>
