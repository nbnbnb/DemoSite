@echo off
%windir%\system32\inetsrv\appcmd.exe set site "DemoSite" --bindings.[protocol='net.tcp',bindingInformation='808:*']
set /p num=