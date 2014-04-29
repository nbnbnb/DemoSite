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
 * Description: OTP Z201(TOTP) ��֤�ӿ�
 * Parameter  : 
 *		authkey			������Կ�������ṩ���ṩ�� //Ӧ�������ݿ��У�ʹ��ʱselect
 *      t               ��ǰʱ�����UTC Epoch����
 *      t0              ��ʼ�ο�ʱ�����UTC Epoch����(Ĭ��Ϊ0)
 *      x               TOTP�仯����(Ĭ��Ϊ60��)
 *      drift           Ư��ֵ������ʱ��У׼��  //���ݿ���ȡ����һ�θ�0.
 *      authwnd		    ��֤��Χ, ͨ����0-20
 *      lastsucc        ǰһ����֤�ɹ������UTC Epoch����(Ϊ��ֹ�طŹ���) //���ݿ���ȡ����һ�θ�0.
 *      otp				��Ҫ��֤�Ķ�̬����
 *      otplen			��Ҫ��֤�Ķ�̬�����, ͨ����6
 *      currsucc		��֤�ɹ�������UTC Epoch����  //��֤�ɹ���Ӧд�����ݿ⣬���´ε��á�
 *      currdft         ��֤�ɹ���ĵ�ǰƯ�ƴ���       //��֤�ɹ���Ӧд�����ݿ⣬���´ε��á�
 *
 * return     : 0 - �ɹ�, ����ֵΪ����.
 *
 *int __stdcall ET_CheckPwdz201(char *authkey, uint64_t t, uint64_t t0, 
 *   unsigned int x, int drift, int authwnd, uint64_t lastsucc, 
 *   const char *otp, int otplen, uint64_t *currsucc, int *currdft);
 */

/* =============================================================================
 * Function   : ET_Syncz201
 * Description: OTP Z201(TOTP) ͬ���ӿ�
 * Parameter  : 
 *		authkey			������Կ���Ѿ����ܹ��ģ���Ҫ������н���
 *      t               ��ǰʱ�����UTC Epoch����
 *      t0              ��ʼ�ο�ʱ�����UTC Epoch����(Ĭ��Ϊ0)
 *      x               TOTP�仯����(Ĭ��Ϊ60��)
 *      drift           Ư��ֵ
 *      syncwnd         ͬ����Χ, ͨ����0-40
 *      lastsucc        ǰһ����֤�ɹ������UTC Epoch����(Ϊ��ֹ�طŹ���)
 *      otp1            ��Ҫͬ���ĵ�һ����̬����
 *      otp1len			��Ҫͬ���ĵ�һ����̬�����, ͨ����6
 *      otp2            ��Ҫͬ���ĵڶ�����̬����
 *      otp2len         ��Ҫͬ���ĵڶ�����̬�����, ͨ����6   
 *      currsucc		��֤�ɹ�������UTC Epoch����   //ͬ���ɹ���Ӧд�����ݿ⣬���´ε��á�
 *      currdft         ��֤�ɹ���ĵ�ǰƯ�ƴ���        //ͬ���ɹ���Ӧд�����ݿ⣬���´ε��á�
 *
 * return     : 0 - �ɹ�, ����ֵΪ����.
 
 *int __stdcall ET_Syncz201(char *authkey, uint64_t t, uint64_t t0, 
 *      unsigned int x, int drift, int syncwnd, uint64_t lastsucc, 
 *      const char *otp1, int otp1len, const char *otp2, int otp2len, 
 *      uint64_t *currsucc, int *currdft);
 */

//�뽫ET_OTPVerify.dll������SYSTEM32Ŀ¼��������á�
[DllImport("ET_OTPVerify.dll")]
public static extern int ET_CheckPwdz201(string authkey, UInt64 t, UInt64 t0, uint x, int drift, int authwnd, UInt64 lastsucc, string otp, int otplen, ref UInt64 currsucc, ref int currdft);


[DllImport("ET_OTPVerify.dll")]
public static extern int ET_Syncz201(string authkey, UInt64 t, UInt64 t0, uint x, int drift, int syncwnd, UInt64 lastsucc, string otp1, int otp1len, string otp2, int otp2len, ref UInt64 currsucc, ref int currdft);

UInt64 currsucc1 = 0;
int currdft1 = 0;

int test_auth(string otpkey, string otp)
{
	int iRet = 0;
	string authkey = otpkey; //������Կ��Ӧ�ӷ������˵����ݿ��м����õ����˴�Ϊ�˷�����ԣ�ֱ�Ӵӿͻ��˻�ȡ��
	
	UInt64 currsucc = 0;
	int currdft = 0;
	
	TimeSpan tsTimeSpan = DateTime.UtcNow - new DateTime(1970, 1, 1);
	ulong ulgTimeStamp = (ulong)tsTimeSpan.TotalSeconds;
	
	iRet = ET_CheckPwdz201(authkey, ulgTimeStamp, 0, 60, currdft1, 40, currsucc1, otp, 6, ref currsucc, ref currdft);
	if (iRet == 0)
	{
		Message.Text +="<br>��֤�ɹ���";
		
		currsucc1 = currsucc;   //��֤�ɹ���Ӧ�����ɹ�ֵ��д�����ݿ⣬���ӿڵ��á�ʧ�ܲ�Ҫд�����ݿ⡣
		currdft1 = currdft;		//��֤�ɹ���Ӧ����Ư��ֵ��д�����ݿ⣬���ӿڵ��á�ʧ�ܲ�Ҫд�����ݿ⡣
		Message.Text += "<br> otp: " + otp;
		Message.Text += "<br> currsucc: " +currsucc;
		Message.Text += "<br> currdft: " +currdft;
	}
	else
	{
		Message.Text = "��֤ʧ�ܣ�";
	}
	return iRet;
}

int test_sync(string otpkey, string otp1, string otp2)
{
	int iRet = 0;
	string authkey = otpkey;    //������Կ��Ӧ�ӷ������˵����ݿ��м����õ���
	
	UInt64 currsucc = 0;
	int currdft = 0;
	
	TimeSpan tsTimeSpan = DateTime.UtcNow - new DateTime(1970, 1, 1);
	ulong ulgTimeStamp = (ulong)tsTimeSpan.TotalSeconds;
	
	iRet = ET_Syncz201(authkey, ulgTimeStamp, 0, 60, currdft1, 60, currsucc1, otp1, 6, otp2, 6, ref currsucc, ref currdft);
	if (iRet == 0)
	{
		Message.Text +="<br>ͬ���ɹ���";
		
		currsucc1 = currsucc;   //ͬ���ɹ���Ӧ�����ɹ�ֵ��д�����ݿ⣬���ӿڵ��á�ʧ�ܲ�Ҫд�����ݿ⡣
		currdft1 = currdft;     //ͬ���ɹ���Ӧ����Ư��ֵ��д�����ݿ⣬���ӿڵ��á�ʧ�ܲ�Ҫд�����ݿ⡣
		Message.Text += "<br> otp1: " + otp1;	
		Message.Text += "<br> otp2: " + otp2;		
		Message.Text += "<br> currsucc: " +currsucc;
		Message.Text += "<br> currdft: " +currdft;
	}
	else
	{
		Message.Text = "ͬ��ʧ�ܣ�";
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