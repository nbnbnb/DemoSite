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
            					<td colspan="2" align="center">认证</td>
            				</tr>
            				<tr>
            					<td>KEY:</td>
            					<td><input type="text" name="otpkey" size="70" value="输入动态令牌密钥，无密钥请向令牌提供商索取！输入前删除提示文字！"/></td>
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
            					<td colspan="2" align="center">同步</td>
            				</tr>
            				<tr>
            					<td>KEY:</td>
            					<td><input type="text" name="otpkey" size="70" value="输入动态令牌密钥，无密钥请向令牌提供商索取！输入前删除提示文字！"/></td>
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
      
<p>测试前，要先将ET_OTPVerify.dll拷贝到网页服务器系统目录下，一般为C:\windows\system32目录。</p>
<p>返回值：</p>      
<p>#define OTP_SUCCESS&nbsp;&nbsp;&nbsp;(0x00000000L)&nbsp;&nbsp;&nbsp;//操作成功</p>
<p>#define OTP_ERR_INVALID_PARAMETER&nbsp;&nbsp;&nbsp;(0x00000001L)&nbsp;&nbsp;&nbsp;//参数无效</p>
<p>#define OTP_ERR_CHECK_PWD&nbsp;&nbsp;&nbsp;(0x00000002L)&nbsp;&nbsp;&nbsp;//认证失败</p>
<p>#define OTP_ERR_SYN_PWD&nbsp;&nbsp;&nbsp;(0x00000003L)&nbsp;&nbsp;&nbsp;//同步失败</p>
<p>#define OTP_ERR_REPLAY&nbsp;&nbsp;&nbsp;(0x000000004)&nbsp;&nbsp;&nbsp;//动态口令被重放</p>

<p><A href="http://www.jansh.com.cn/upload/solution/otp_app.pdf" target=_blank>附：OTP与应用系统的集成方法</A></P>

	</body>
</html>