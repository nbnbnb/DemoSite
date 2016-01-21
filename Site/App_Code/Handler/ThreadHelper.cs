using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

/// <summary>
/// ThreadHelper 的摘要说明
/// </summary>
public static class ThreadHelper
{
    public static EndEventHandler BuildSyncContextCallback(EndEventHandler callback)
    {
        SynchronizationContext sc = SynchronizationContext.Current;
        if (sc == null)
        {
            return callback;
        }
        return ar =>
        {
            sc.Post(obj =>
            {
                callback((IAsyncResult)obj);
            }, ar);
        };
    }
}