<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="CongNgheDotNet.test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Hocisdabest</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            A: <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        <br />        
            B: <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
        <br />
            <asp:Button ID="Button1" runat="server" Text="Button" OnClick="Button1_Click" />
        <br />    
            <div id="kq" runat="server"></div>
        </div>
    </form>
</body>
</html>
