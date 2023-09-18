$(document).ready(function () {
    $("#login").click(function () {
        //lấy được thông tin mà người dùng nhập vào
        //gửi đi kèm action='them_kh'
        //đợi phản hồi: ok thì gọi hàm get_ds_kh()
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
                alert("Data: " + data + "\nStatus: " + status);               
            });
    });


    $('#test').on('click', function () {
        $.alert({
            columnClass: 'col-md-4 col-md-offset-4',
            title: 'Alert!',
            content: 'Simple alert!',
        });
    });

    $('#test1').on('click', function () {
        $.dialog({
            boxWidth: '30%',
            title: 'Text content!',
            content: 'Simple modal!',
        });
    });

});
