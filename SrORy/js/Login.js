$(document).ready(function () {
    $("#login").click(function () {
        //lấy được thông tin mà người dùng nhập vào
        //gửi đi kèm action='them_kh'
        //đợi phản hồi: ok thì gọi hàm get_ds_kh()
        var send_data = {
            action: 'dangnhap',           
            email_user: $('#email_user_login').val(),
            password_user: $('#password_user_login').val(),
        }

        $.post("api.aspx",
            send_data,
            function (data) {
                var L = JSON.parse(data);               
                if (L.ok == false) {
                    $.confirm({
                        title: 'Lỗi đăng nhập',
                        content: 'Email hoặc mật khẩu không trùng khớp',
                        type: 'red',
                        typeAnimated: true,
                        buttons: {
                            tryAgain: {
                                text: 'Thử lại',
                                btnClass: 'btn-red',                               
                            },                            
                        }
                    });
                }
                else {
                    $.confirm({
                        title: 'Chào mừng',
                        content: 'Xin chào ' + L.name_user,
                        type: 'green',
                        typeAnimated: true,
                        buttons: {
                            tryAgain: {
                                text: 'OK',
                                btnClass: 'btn-green',
                            },
                        }
                    });
                }
                            
            });
    });


    $('#signup').on('click', function () {
        $.confirm({
            type: 'blue',
            typeAnimated: true,
            draggable: true,
            columnClass: 's',
            title: 'Thêm người dùng mới',
            content: '<table class="table table-responsive">' +
                '<tr>' +
                '<td align=right>Tên người dùng:</td>' +
                '<td><input class="input100" type="text" id="name_user" required /></td>' +
                '</tr>' +
                '<tr>' +
                '<td align=right>Email:</td>' +
                '<td><input type="text" id="email_user" required /></td>' +
                '</tr>' +
                '<tr>' +
                '<td align=right>Password:</td>' +
                '<td><input type="password" id="password_user" required />' + '<input type="checkbox" id="show-password"> Show Password' + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align=right>Ngày sinh:</td>' +
                '<td><input type="date" id="birthday" required /></td>' +
                '</tr>' +
                '<tr>' +
                '<td align=right>Giới tính:</td>' +
                '<td><select name="gender" id="gender">' +
                '<option value="male"> Nam </option>' +
                '<option value="female" > Nữ </option> ' +
                '<option value="undefined">Tạm thời chưa chọn</option>' +
                '</select>' +
                '</td>' +
                '</tr>' +
                '</table>',
            buttons: {
                formSubmit: {
                    text: 'Xong',
                    btnClass: 'btn-blue',
                    action: function () {
                        var send_data = {
                            action: 'them_user',
                            name_user: $('#name_user').val(),
                            email_user: $('#email_user').val(),
                            password_user: $('#password_user').val(),
                            birthday: $('#birthday').val(),
                            gender: $('#gender').val(),
                        }

                        $.post("api.aspx",
                            send_data,
                            function (data, status) {
                                $.alert("Data: " + data + "\nStatus: " + status);
                            });
                    }
                },
                cancel: function () {
                    //close
                },
            },
            onContentReady: function () {

            }
        });
    });

    function myFunction() {
        var x = document.getElementById("password_user");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    $('#show-password').on('click', function () {
        myFunction();
    });

    $('#forget-pw').on('click', function () {
        var email_dialog = $.confirm({
            title: 'Quên mật khẩu',
            content: '' +
                '<div class="form-group">' +
                '<label>Nhập email mà bạn muốn khôi phục mật khẩu</label>' +
                '<input type="text" placeholder="Your email" class="name form-control" id="email_user_quenmk"required />' +
                '<div id="show_error_email"></div>' +
                '</div>',
            buttons: {
                formSubmit: {
                    text: 'Xác nhận',
                    btnClass: 'btn-blue',
                    action: function () {
                        var email_user_quenmk = $('#email_user_quenmk').val();
                        var send_data_mail = {
                            action: 'quen_mk',
                            sub_action: 'gui_otp',
                            email_user: email_user_quenmk,                           
                        }

                        $.post("api.aspx",
                            send_data_mail,
                            function (data) {
                                var result_mail = JSON.parse(data);
                                if (result_mail.ok) {
                                    var otp_dialog = $.confirm({
                                        title: 'Xác nhận mã OTP',
                                        content: '' +
                                            '<div class="form-group">' +
                                            '<label>Nhập 6 chữ số đã được gửi tới email của bạn </label>' +
                                            '<input type="text" placeholder="OTP" class="name form-control" id="otp" required />' +
                                            '<div id="show_error_otp"></div>' +
                                            '</div>',
                                        buttons: {
                                            formSubmit: {
                                                text: 'Xác nhận',
                                                btnClass: 'btn-blue',
                                                action: function () {
                                                    var send_data_otp = {
                                                        action: 'quen_mk',
                                                        sub_action: 'xacnhan_otp',
                                                        email_user: email_user_quenmk,
                                                        otp: $('#otp').val(),
                                                    }

                                                    $.post("api.aspx",
                                                        send_data_otp,
                                                        function (data) {
                                                            var result_otp = JSON.parse(data);
                                                            if (result_otp.ok) {
                                                                var repassword_dialog = $.confirm({
                                                                    title: 'Xác nhận mật khẩu mới',
                                                                    content: '' +
                                                                        '<div class="form-group">' +
                                                                        '<label>Nhập mật khẩu mới của bạn </label>' +
                                                                        '<input type="text" placeholder="Nhập mật khẩu mới" class="name form-control" id="repassword1" required />' +
                                                                        '<input type="text" placeholder="Xác nhận mật khẩu mới" class="name form-control" id="repassword2" required />' +
                                                                        
                                                                        '</div>',
                                                                    buttons: {
                                                                        formSubmit: {
                                                                            text: 'Xác nhận',
                                                                            btnClass: 'btn-blue',
                                                                            action: function () {
                                                                                if ($('#repassword2').val() != $('#repassword1').val()) {
                                                                                    $.alert("Phần xác nhận mật khẩu không trùng khớp");                                                                                    
                                                                                }
                                                                                else {
                                                                                    var send_data_rpw = {
                                                                                        action: 'quen_mk',
                                                                                        sub_action: 'doimk_user',
                                                                                        email_user: email_user_quenmk,
                                                                                        password_user: $('#repassword2').val(),
                                                                                    }

                                                                                    $.post("api.aspx",
                                                                                        send_data_rpw,
                                                                                        function (data) {
                                                                                            var result_rpw = JSON.parse(data);
                                                                                            if (result_rpw.ok) {
                                                                                                $.alert("Mật khẩu đã thay đổi thành công");
                                                                                                repassword_dialog.close();
                                                                                            }
                                                                                            else {
                                                                                                $.alert("Lỗi đổi mật khẩu");
                                                                                                //$('#show_error_mk').html(result_rpw.error);
                                                                                                //$('#show_error_mk').css("color", "red");
                                                                                            }
                                                                                        });
                                                                                }
                                                                                return false;                                                                             
                                                                            }
                                                                        },
                                                                        cancel: function () {

                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            else {                                                               
                                                                otp_dialog.open();
                                                                $('#show_error_otp').html(result_otp.error);
                                                                $('#show_error_otp').css("color", "red");
                                                            }
                                                        });
                                                }
                                            },
                                            cancel: function () {

                                            }
                                        }
                                    });
                                }
                                else {
                                    email_dialog.open();
                                    $('#show_error_email').html(result_mail.error);
                                    $('#show_error_email').css("color", "red");
                                }
                            });
                       
                    }
                },
                cancel: function () {     
                    
                },
            },
            onContentReady: function () {
               
            }
        });
    });

    $('#playmp3').on('click', function () {
        $.post("api.aspx",
            { action: 'playmp3', text: $('#tts').val()},
            function (audio_fn) {
                var audio = new Audio('mp3/' + audio_fn);
                audio.play();
            });
    });

    $('#check_gmail').on('click', function () {
        $.post("api.aspx",
            { action: 'check_gmail', gmail: $('#gmail').val() },
            function (data) {
                alert(data);
            });
    });

    $('#tcp_client').on('click', function () {
        $.post("api.aspx",
            { action: 'tcp_client', dns_gmail: $('#dns_gmail').val() },
            function (data) {
                $.alert(data);
            });
    });
});
