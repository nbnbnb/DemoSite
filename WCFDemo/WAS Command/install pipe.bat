@echo off
%windir%\system32\inetsrv\appcmd.exe set site "DemoSite" -+bindings.[protocol='net.pipe',bindingInformation='Calc']
set /p num=