#!/usr/bin/env python

import cgi
import time
form = cgi.FieldStorage()
name=form.getvalue('name','Python')

print """Content-type: text/html

<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>CGI Python</title>
</head>
	<body>
		<h1>Hello, %s <br/> %s</h1>
		<form action="hello.py">
			Change name 
			<input type="text" name="name"/>
			<input type="submit"/>
		</form>
	</body>
</html>
""" % (name,time.asctime())
