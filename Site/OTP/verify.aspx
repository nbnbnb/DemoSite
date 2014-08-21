<%@ Page Language="C#" Description="ET99 Demo ---ASP.NET" %>
<%@ Import Namespace="System"%>
<%@ Import Namespace="System.IO"%>
<%@ Import Namespace="System.Runtime.InteropServices"%>

<script language="c#" runat=server>
//by Liang Zhengyi 
//Date: 2011/6/2
//otp Function 

/* =============================================================================
 * Function   : ET_CheckPwdz201
 * Description: OTP Z201(TOTP) 认证接口
 * Parameter  : 
 *		authkey			令牌密钥（令牌提供商提供） //应存入数据库中，使用时select
 *      t               当前时间相对UTC Epoch秒数
 *      t0              起始参考时间相对UTC Epoch秒数(默认为0)
 *      x               TOTP变化周期(默认为60秒)
 *      drift           漂移值（用于时间校准）  //数据库中取，第一次给0.
 *      authwnd		    认证范围, 通常是0-20
 *      lastsucc        前一次认证成功的相对UTC Epoch秒数(为防止重放攻击) //数据库中取，第一次给0.
 *      otp				需要认证的动态口令
 *      otplen			需要认证的动态口令长度, 通常是6
 *      currsucc		认证成功后的相对UTC Epoch秒数  //认证成功后应写入数据库，供下次调用。
 *      currdft         认证成功后的当前漂移次数       //认证成功后应写入数据库，供下次调用。
 *
 * return     : 0 - 成功, 其他值为错误.
 *
 *int __stdcall ET_CheckPwdz201(char *authkey, uint64_t t, uint64_t t0, 
 *   unsigned int x, int drift, int authwnd, uint64_t lastsucc, 
 *   const char *otp, int otplen, uint64_t *currsucc, int *currdft);
 */

/* =============================================================================
 * Function   : ET_Syncz201
 * Description: OTP Z201(TOTP) 同步接口
 * Parameter  : 
 *		authkey			令牌密钥，已经加密过的，需要对其进行解密
 *      t               当前时间相对UTC Epoch秒数
 *      t0              起始参考时间相对UTC Epoch秒数(默认为0)
 *      x               TOTP变化周期(默认为60秒)
 *      drift           漂移值
 *      syncwnd         同步范围, 通常是0-40
 *      lastsucc        前一次认证成功的相对UTC Epoch秒数(为防止重放攻击)
 *      otp1            需要同步的第一个动态口令
 *      otp1len			需要同步的第一个动态口令长度, 通常是6
 *      otp2            需要同步的第二个动态口令
 *      otp2len         需要同步的第二个动态口令长度, 通常是6   
 *      currsucc		认证成功后的相对UTC Epoch秒数   //同步成功后应写入数据库，供下次调用。
 *      currdft         认证成功后的当前漂移次数        //同步成功后应写入数据库，供下次调用。
 *
 * return     : 0 - 成功, 其他值为错误.
 
 *int __stdcall ET_Syncz201(char *authkey, uint64_t t, uint64_t t0, 
 *      unsigned int x, int drift, int syncwnd, uint64_t lastsucc, 
 *      const char *otp1, int otp1len, const char *otp2, int otp2len, 
 *      uint64_t *currsucc, int *currdft);
 */

//请将ET_OTPVerify.dll拷贝到SYSTEM32目录，方便调用。
[DllImport("ET_OTPVerify.dll")]
public static extern int ET_CheckPwdz201(string authkey, UInt64 t, UInt64 t0, uint x, int drift, int authwnd, UInt64 lastsucc, string otp, int otplen, ref UInt64 currsucc, ref int currdft);


[DllImport("ET_OTPVerify.dll")]
public static extern int ET_Syncz201(string authkey, UInt64 t, UInt64 t0, uint x, int drift, int syncwnd, UInt64 lastsucc, string otp1, int otp1len, string otp2, int otp2len, ref UInt64 currsucc, ref int currdft);

UInt64 currsucc1 = 0;
int currdft1 = 0;

int test_auth(string otpkey, string otp)
{
	int iRet = 0;
	string authkey = otpkey; //令牌密钥，应从服务器端的数据库中检索得到。此处为了方便测试，直接从客户端获取。
	
	UInt64 currsucc = 0;
	int currdft = 0;
	
	TimeSpan tsTimeSpan = DateTime.UtcNow - new DateTime(1970, 1, 1);
	ulong ulgTimeStamp = (ulong)tsTimeSpan.TotalSeconds;
	
	iRet = ET_CheckPwdz201(authkey, ulgTimeStamp, 0, 60, currdft1, 40, currsucc1, otp, 6, ref currsucc, ref currdft);
	if (iRet == 0)
	{
		Message.Text +="<br>认证成功！";
		
		currsucc1 = currsucc;   //认证成功后应将“成功值”写回数据库，供接口调用。失败不要写回数据库。
		currdft1 = currdft;		//认证成功后应将“漂移值”写回数据库，供接口调用。失败不要写回数据库。
		Message.Text += "<br> otp: " + otp;
		Message.Text += "<br> currsucc: " +currsucc;
		Message.Text += "<br> currdft: " +currdft;
	}
	else
	{
		Message.Text = "认证失败！";
	}
	return iRet;
}

int test_sync(string otpkey, string otp1, string otp2)
{
	int iRet = 0;
	string authkey = otpkey;    //令牌密钥，应从服务器端的数据库中检索得到。
	
	UInt64 currsucc = 0;
	int currdft = 0;
	
	TimeSpan tsTimeSpan = DateTime.UtcNow - new DateTime(1970, 1, 1);
	ulong ulgTimeStamp = (ulong)tsTimeSpan.TotalSeconds;
	
	iRet = ET_Syncz201(authkey, ulgTimeStamp, 0, 60, currdft1, 60, currsucc1, otp1, 6, otp2, 6, ref currsucc, ref currdft);
	if (iRet == 0)
	{
		Message.Text +="<br>同步成功！";
		
		currsucc1 = currsucc;   //同步成功后应将“成功值”写回数据库，供接口调用。失败不要写回数据库。
		currdft1 = currdft;     //同步成功后应将“漂移值”写回数据库，供接口调用。失败不要写回数据库。
		Message.Text += "<br> otp1: " + otp1;	
		Message.Text += "<br> otp2: " + otp2;		
		Message.Text += "<br> currsucc: " +currsucc;
		Message.Text += "<br> currdft: " +currdft;
	}
	else
	{
		Message.Text = "同步失败！";
	}
	return iRet;
}

</script>

<%
string demoType = Request.Form["demoType"];

if(demoType == "auth")
{
	string otpkey = Request.Form["otpkey"];
	string otp = Request.Form["otp"];
	Message.Text = "otpkey: " + otpkey+"<br>";
	int Result = test_auth(otpkey, otp);
	if (Result == 0)
		Message.Text += "<br> Congratulations! Authenticate OK!";
	else
		Message.Text += "<br>Sorry ,maybe your password is not correct! " + "<br>ErrorCode: "+Result;
}
if(demoType == "syn")
{
	string otpkey = Request.Form["otpkey"];
	string otp1 = Request.Form["otp1"];
	string otp2 = Request.Form["otp2"];
	Message.Text = "otpkey: " + otpkey+"<br>";
	int Result = test_sync(otpkey, otp1, otp2);
	if (Result == 0)
		Message.Text += "<br> Synchronous OK!";
	else
		Message.Text += "<br>Sorry ,maybe your password is not correct! " + "<br>ErrorCode: "+Result;
}
%>

<html>
<body>
<asp:label id="Message" forecolor="red" font-bold="true" runat=server/><br>
</body>
</html>