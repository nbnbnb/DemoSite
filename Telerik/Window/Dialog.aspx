<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Dialog.aspx.cs" Inherits="Telerik_Window_Dialog" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">

    <telerik:RadScriptManager ID="RadScriptManager1" runat="server">
    </telerik:RadScriptManager>
    <telerik:RadFormDecorator ID="RadFormDecorator1" DecoratedControls="All" runat="server"
        Skin="Sunset" />
    <script type="text/javascript">

        function GetRadWindow() {
            var oWindow = null;
            if (window.radWindow) {
                oWindow = window.radWindow;                
            }
            else if (window.frameElement.radWindow) {
                // use this
                oWindow = window.frameElement.radWindow;                
            }
            return oWindow;
        }

        function returnToParent() {
            //create the argument that will be returned to the parent page
            var oArg = new Object();

            //get the selected date from RadDatePicker
            var datePicker = $find("<%= Datepicker1.ClientID %>");
            oArg.selDate = datePicker.get_selectedDate().toLocaleDateString();

            oArg.cityName = "WuHan";

            //get a reference to the current RadWindow
            var oWnd = GetRadWindow();

            //Close the RadWindow and send the argument to the parent page
            if (oArg.selDate) {
                oWnd.close(oArg);
            }
            else {
                alert("Please fill both fields");
            }
        }
    </script>

    <div>
        <fieldset>
            <legend>One way ticket</legend><span style="margin: 6px 0 0 18px;">Choose date:</span>
            <telerik:RadDatePicker ID="Datepicker1" Skin="Sunset" runat="server">
            </telerik:RadDatePicker>
        </fieldset>    

        <div style="margin-top: 4px; text-align: right;">
            <button title="Submit" id="close" onclick="returnToParent(); return false;">
                Submit</button>
        </div>

    </div>
    </form>
</body>
</html>
