<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
		<title>ETz201 PHP demo page</title>
	</head>
	<body>
		<h1>ETOTP ASP.NET(C#) demo page</h1>
		<form name="ETz201_auth" action="verify.aspx" method="post">
			<input type="hidden" name="demoType" value="auth" />
     			<table border="1" cellpadding="0" cellspacing="0">
            				<tr>
            					<td colspan="2" align="center">��֤</td>
            				</tr>
            				<tr>
            					<td>KEY:</td>
            					<td><input type="text" name="otpkey" size="70" value="���붯̬������Կ������Կ���������ṩ����ȡ������ǰɾ����ʾ���֣�"/></td>
            				</tr>
            				<tr>
            					<td>OTP:</td>
            					<td><input type="text" name="otp" size="70"/></td>
            				</tr>
            				<tr>
            					<td colspan="2" align="center"><input type="submit" value="Auth" /> <input type="reset" value="Reset" /></td>
            				</tr>
       			</table>
      </form>
      <form name="ETz201_syn" action="verify.aspx" method="post">
			<input type="hidden" name="demoType" value="syn" />
     			<table border="1" cellpadding="0" cellspacing="0">
            				<tr>
            					<td colspan="2" align="center">ͬ��</td>
            				</tr>
            				<tr>
            					<td>KEY:</td>
            					<td><input type="text" name="otpkey" size="70" value="���붯̬������Կ������Կ���������ṩ����ȡ������ǰɾ����ʾ���֣�"/></td>
            				</tr>
            				<tr>
            					<td>OTP1:</td>
            					<td><input type="text" name="otp1" size="70"/></td>
            				</tr>
            				<tr>
            					<td>OTP2:</td>
            					<td><input type="text" name="otp2" size="70"/></td>
            				</tr>
            				<tr>
            					<td colspan="2" align="center"><input type="submit" value="Syn" /> <input type="reset" value="Reset" /></td>
            				</tr>
       			</table>
      </form>
      
<p>����ǰ��Ҫ�Ƚ�ET_OTPVerify.dll��������ҳ������ϵͳĿ¼�£�һ��ΪC:\windows\system32Ŀ¼��</p>
<p>����ֵ��</p>      
<p>#define OTP_SUCCESS&nbsp;&nbsp;&nbsp;(0x00000000L)&nbsp;&nbsp;&nbsp;//�����ɹ�</p>
<p>#define OTP_ERR_INVALID_PARAMETER&nbsp;&nbsp;&nbsp;(0x00000001L)&nbsp;&nbsp;&nbsp;//������Ч</p>
<p>#define OTP_ERR_CHECK_PWD&nbsp;&nbsp;&nbsp;(0x00000002L)&nbsp;&nbsp;&nbsp;//��֤ʧ��</p>
<p>#define OTP_ERR_SYN_PWD&nbsp;&nbsp;&nbsp;(0x00000003L)&nbsp;&nbsp;&nbsp;//ͬ��ʧ��</p>
<p>#define OTP_ERR_REPLAY&nbsp;&nbsp;&nbsp;(0x000000004)&nbsp;&nbsp;&nbsp;//��̬����ط�</p>

<p><A href="http://www.jansh.com.cn/upload/solution/otp_app.pdf" target=_blank>����OTP��Ӧ��ϵͳ�ļ��ɷ���</A></P>

	</body>
</html>