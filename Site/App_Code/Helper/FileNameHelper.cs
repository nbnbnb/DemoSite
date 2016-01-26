using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.Helper
{
    /// <summary>
    /// 根据不同浏览器
    /// 获取下载文件名
    /// </summary>
    public static class FileNameHelper
    {
        /// <summary>
        /// 用于浏览器的差异性，导致中文文件名，带空格文件名下载时
        /// 不能正确显示
        /// </summary>
        /// <param name="originName">待扩展名的原始方法</param>
        /// <returns></returns>
        public static string GetDownloadFileName(string originName)
        {
            HttpContext context = System.Web.HttpContext.Current;
            string fileName = String.Empty;
            if (null == context)
            {
                throw new NotSupportedException("当前环境不适用此方法");
            }

            if (context.Request.Browser.IsBrowser("InternetExplorer"))
            {
                // 处理 IE 中空格变 + 号的问题
                fileName = context.Server.UrlEncode(originName).Replace("+", "%20");
            }
            else
            {
                fileName = "=?UTF-8?B?" + Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(originName)) + "?=";
            }

            return fileName;
        }
    }
}