
$(document).ready(function () {
function them_user() {
    //show ra 1 hộp thoại: có 4 trường cần nhập cho 1 kh mới
    var dialog_add = $.confirm({
        closeIcon: true,
        type: 'blue',
        typeAnimated: true,
        draggable: true,
        columnClass: 's',
        title: 'Thêm người dùng mới!',
        content: '<table>' +
            '<tr>' +
            '<td align=right>Tên người dùng:</td>' +
            '<td><input type="text" id="user-name" required /></td>' +
            '</tr>' +
            '<tr>' +
            '<td align=right>Email:</td>' +
            '<td><input type="text" id="user-email" required /></td>' +
            '</tr>' +
            '<tr>' +
            '<td align=right>Password:</td>' +
            '<td><input type="text" id="user-password" required /></td>' +
            '</tr>' +
            '<tr>' +
            '<td align=right>Ngày sinh:</td>' +
            '<td><input type="date" id="user-birthday" required /></td>' +
            '</tr>' + 
            '<tr>' +
            '<td align=right>Giới tính:</td>' +
            '<td><input type="text" id="user-gender" required /></td>' +
            '</tr>' +
            '</table>'
        ,
        buttons: {
            formSubmit: {
                text: 'Thêm User vào CSDL',
                btnClass: 'btn-blue',
                action: function () {
                    //lấy được thông tin mà người dùng nhập vào
                    //gửi đi kèm action='them_kh'
                    //đợi phản hồi: ok thì gọi hàm get_ds_kh()
                    var send_data = {
                        action: 'them_user',
                        name_user: $('#user-name').val(),
                        email_user: $('#user-email').val(),
                        password_user: $('#user-password').val(),
                        birthday: $('#user-birthday').val(),
                        gender: $('#user-gender').val(),
                    }

                    $.post("api.aspx",
                        send_data,
                        function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                //ok thì tải lại ds kh
                                get_ds_kh();
                                //đóng bố lại
                                dialog_add.close();
                            } else {
                                //thông báo lỗi
                                $.dialog({
                                    title: 'Báo lỗi',
                                    type: 'red',
                                    content: json.error,
                                });
                            }
                        });
                    return false;// ko đóng dialog bố
                }
            },
            cancel: {
                text: 'Đóng',
                btnClass: 'btn-red',
                action: function () {
                    //close
                }
            },
        },
        onContentReady: function () {
            $('#user-name').focus();
        }
    });
}

    $("#them-user").click(function () { them_user(); });

});