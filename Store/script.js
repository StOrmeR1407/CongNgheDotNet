﻿$(document).ready(function () {
    $('#login').on('click', function () {
        var dialog_login = $.confirm({
            title: 'Đăng nhập!',
            content: '' +
                '<div class="form-group">' +
                    '<label>Enter tên</label>' +
                    '<input type="text" placeholder="Your name" id="username" class="name form-control" required />' +
                    '<label>Enter password</label>' +
                    '<input type="text" placeholder="Your password" id="password" class="name form-control" required />' +
                '</div>' 
                 ,
            buttons: {
                formSubmit: {
                    text: 'Submit',
                    btnClass: 'btn-blue',
                    action: function () {
                        $.post("API.aspx",
                            {
                                action : 'login',
                                username : $('#username').val(),
                                password : $('#password').val()
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                
                                if (j.ok) {
                                    $.alert("Đăng nhập thành công");
                                }
                                else {
                                    $.alert("Đăng nhập thất bại");
                                    dialog_login.open();
                                }
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

    $('#signup').on('click', function () {
        var dialog_login = $.confirm({
            title: 'Đăng kí!',
            content: `
                <div class="form-floating mb-3 mt-3">
                  <input type="text" class="form-control" id="name" placeholder="Enter name">
                  <label>Name</label>
                </div>

                <div class="form-floating mb-3 mt-3">
                  <input type="text" class="form-control" id="username" placeholder="Enter username">
                  <label>Username</label>
                </div>

                <div class="form-floating mt-3 mb-3">
                  <input type="text" class="form-control" id="password" placeholder="Enter password">
                  <label >Password</label>
                </div>

                <div class="form-floating mt-3 mb-3">
                  <input type="text" class="form-control" id="emaill" placeholder="Enter email">
                  <label >Email</label>
                </div>
            `
            ,
            buttons: {
                formSubmit: {
                    text: 'Submit',
                    btnClass: 'btn-blue',
                    action: function () {
                        $.post("API.aspx",
                            {
                                action: 'signup',
                                name: $('#name').val(),
                                username: $('#username').val(),
                                password: $('#password').val(),   
                                email: $('#emaill').val(),
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    $.alert("Đăng kí thành công");
                                    dialog_login.close();
                                }
                                else {
                                    $.alert("Đăng kí thất bại");
                                    return false;
                                }
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

    $('#modify').on('click', function () {
        var dialog_login = $.confirm({
            title: 'Sửa đổi!',
            content: `
                <div class="form-floating mb-3 mt-3">
                  <input type="text" class="form-control" id="name" placeholder="Enter name">
                  <label>Name</label>
                </div>

                <div class="form-floating mt-3 mb-3">
                  <input type="text" class="form-control" id="emaill" placeholder="Enter email">
                  <label >Email</label>
                </div>
            `
            ,
            buttons: {
                formSubmit: {
                    text: 'Submit',
                    btnClass: 'btn-blue',
                    action: function () {
                        $.post("API.aspx",
                            {
                                action: 'modify',
                                id: 7,
                                name: $('#name').val(),
                                email: $('#emaill').val(),   
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    $.alert("Sửa đổi thành công");
                                    dialog_login.close();
                                }
                                else {
                                    $.alert("Sửa đổi thất bại: " + j.msg); 
                                }
                            }
                        );
                        return false;
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
    $("#thu").tablesorter();
    $('#thu').on('click', '.edit-btn', function () {
        var nguonThu = $(this).closest('tr').find('td:eq(1)').text();
        var loai = $(this).closest('tr').find('td:eq(2)').text();
        var soTien = $(this).closest('tr').find('td:eq(3)').text();
        var thoiGian = $(this).closest('tr').find('td:eq(4)').text();

        $.confirm({
            title: 'Chỉnh Sửa Nguồn Thu',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Nguồn Thu:</label>' +
                '<input type="text" class="form-control" value="' + nguonThu + '" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Loại:</label>' +
                '<input type="text" class="form-control" value="' + loai + '" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Số Tiền:</label>' +
                '<input type="text" class="form-control" value="' + soTien + '" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Thời Gian:</label>' +
                '<input type="date" class="form-control" value="' + thoiGian + '" required />' +
                '</div>' +
                '</form>',
            buttons: {
                sửa: {
                    text: 'Sửa',
                    btnClass: 'btn-warning',
                    action: function () {
                        var newNguonThu = $('.formName input:eq(0)').val();
                        var newLoai = $('.formName input:eq(1)').val();
                        var newSoTien = $('.formName input:eq(2)').val();
                        var newThoiGian = $('.formName input:eq(3)').val();
                        // Thực hiện xử lý chỉnh sửa ở đây
                    }
                },
                cancel: function () {
                    // Hủy thao tác chỉnh sửa
                }
            }
        });
    });


    // Bắt sự kiện click cho nút "Thêm mới" của bảng London
    $('#addNew').on('click', function () {
        $.confirm({
            title: 'Thêm Mới Nguồn Thu',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Nguồn Thu:</label>' +
                '<input type="text" class="form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Loại:</label>' +
                '<input type="text" class="form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Số Tiền:</label>' +
                '<input type="text" class="form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Thời Gian:</label>' +
                '<input type="date" class="form-control" required />' +
                '</div>' +
                '</form>',
            buttons: {
                thêm: {
                    text: 'Thêm',
                    btnClass: 'btn-success',
                    action: function () {
                        var nguonThu = $('.formName input:eq(0)').val();
                        var loai = $('.formName input:eq(1)').val();
                        var soTien = $('.formName input:eq(2)').val();
                        var thoiGian = $('.formName input:eq(3)').val();
                        // Thực hiện thêm mới dữ liệu ở đây
                    }
                },
                cancel: function () {
                    // Hủy thao tác thêm mới
                }
            }
        });
    });


});

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}