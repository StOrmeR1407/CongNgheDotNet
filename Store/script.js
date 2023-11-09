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

    $('#add_income').on('click', function () {

        $.confirm({
            title: 'Thêm',
            content: `
                        <div class="form-floating mb-3 mt-3">
                          <input type="text" class="form-control" id="add_name" placeholder="Enter name">
                          <label>Name</label>
                        </div>

                        <select class="form-select" aria-label="Default select example" id="add_category">
                          <option value="0" selected>Chọn một loại thu nhập</option>
                          <option value="1">Thu nhập chính</option>
                          <option value="2">Thu nhập ngoài giờ</option>
                          <option value="3">Thu nhập tài sản</option>
                          <option value="4">Thu nhập trợ cấp</option>
                          <option value="5">Khác</option>
                        </select>

                        <div class="form-floating mt-3 mb-3">
                          <input type="number" class="form-control" id="add_money" placeholder="Enter money">
                          <label >Money</label>
                        </div>

                        <div class="form-floating mt-3 mb-3">
                          <input type="date" class="form-control" id="add_time" placeholder="Enter time">
                          <label >Time</label>
                        </div>
                        `,
            buttons: {
                ADD: {
                    text: 'Thêm',
                    btnClass: 'btn-primary',
                    action: function () {
                        $.post("API.aspx",
                            {
                                action: 'add_income',
                                id_user: 2,
                                name: $('#add_name').val(),
                                id_category: $('#add_category').val(),
                                money: $('#add_money').val(),
                                time: $('#add_time').val(),
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    $.alert("Thêm thành công");
                                    income();
                                }
                                else {
                                    $.alert("Thêm thất bại: " + j.msg);
                                }
                            }
                        );
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
    $('#income_btn').on('click', function () {
        income();
        $('#add_income').css("display", "block");
    });
    function income() {
        $.post("API.aspx",
            {
                action: 'list_income',
                id_user: 2,
            },
            function (data) {
                var j = JSON.parse(data);
                if (j.ok) {
                    let stt = 0;
                    var content = `                   
                    <table class="table table-hover tablesorter myTable">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Money</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>`;
                    for (let i of j.datas) {
                        content += '<tr>' +
                            '<td>' + ++stt + '</td>' +
                            '<td>' + i.name + '</td>' +
                            '<td>' + i.category + '</td>' +
                            '<td>' + i.money + '</td>' +
                            '<td>' + i.time + '</td>' +
                            '<td><button type="button" class="btn btn-warning modify_btn" data-id=' + i.id + '>Sửa</button></td>' +
                            '<td><button type="button" class="btn btn-danger delete_btn" data-id=' + i.id + '>Xoá</button></td>' +
                            '</tr>';
                    }
                    content += '</tbody></table>';
                    $('#income_table').html(content);
                }
                else {
                    $.alert("Tải thất bại: " + j.msg);
                }

                $('.delete_btn').on('click', function () {
                    let iid = $(this).attr("data-id");
                    $.confirm({
                        title: 'Xoá',
                        content: `
                Bạn có muốn xoá không ?`,
                        buttons: {
                            delete: {
                                text: 'Xoá',
                                btnClass: 'btn-warning',
                                action: function () {
                                    $.post("API.aspx",
                                        {
                                            action: 'delete_income',
                                            id: iid,
                                        },
                                        function (data) {
                                            var j = JSON.parse(data);
                                            if (j.ok) {
                                                $.alert("Xoá thành công");
                                                income();
                                            }
                                            else {
                                                $.alert("Xoá thất bại: " + j.msg);
                                            }
                                        }
                                    );
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

                $('.modify_btn').on('click', function () {
                    let iid = $(this).attr("data-id");
                    let income;
                    for (var item of j.datas) {
                        if (item.id == iid) {
                            income = item;
                            break;
                        }
                    }
                    $.confirm({
                        title: 'Xoá',
                        content: `
                        <div class="form-floating mb-3 mt-3">
                          <input type="text" class="form-control" id="modify_name" placeholder="Enter name" value="${income.name}">
                          <label>Name</label>
                        </div>

                        <select class="form-select" aria-label="Default select example" id="modify_category">
                          <option value="0" selected>Chọn một loại thu nhập</option>
                          <option value="1">Thu nhập chính</option>
                          <option value="2">Thu nhập ngoài giờ</option>
                          <option value="3">Thu nhập tài sản</option>
                          <option value="4">Thu nhập trợ cấp</option>
                          <option value="5">Khác</option>
                        </select>

                        <div class="form-floating mt-3 mb-3">
                          <input type="number" class="form-control" id="modify_money" placeholder="Enter money" value="${income.money}">
                          <label >Money</label>
                        </div>

                        <div class="form-floating mt-3 mb-3">
                          <input type="date" class="form-control" id="modify_time" placeholder="Enter time" value=${income.time.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")}>
                          <label >Time</label>
                        </div>
                        `,
                        buttons: {
                            delete: {
                                text: 'Sửa',
                                btnClass: 'btn-warning',
                                action: function () {
                                    $.post("API.aspx",
                                        {
                                            action: 'modify_income',
                                            id: iid,
                                            name: $('#modify_name').val(),
                                            id_category: $('#modify_category').val(),
                                            money: $('#modify_money').val(),
                                            time: $('#modify_time').val(),
                                        },
                                        function (data) {
                                            var j = JSON.parse(data);
                                            if (j.ok) {
                                                $.alert("Sửa thành công");
                                                income();
                                            }
                                            else {
                                                $.alert("Sửa thất bại: " + j.msg);
                                            }
                                        }
                                    );
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
            }
        );     
    }
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