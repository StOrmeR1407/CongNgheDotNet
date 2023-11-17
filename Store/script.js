google.charts.load('current', { packages: ['corechart', 'timeline'] });
$(document).ready(function () {
    var check_login = false;
    var id_user, cookie;
    check_login = ck_login(check_login);

    $('#login').on('click', function () {
        var dialog_login = $.confirm({
            title: 'Đăng nhập!',
            content: `
                <div class="form-floating mb-3 mt-3">
                  <input type="text" class="form-control" id="username" placeholder="Enter username">
                  <label>Username</label>
                </div>

                <div class="form-floating mb-3 mt-3">
                  <input type="password" class="form-control" id="password" placeholder="Enter password">
                  <label>Password</label>
                </div> `
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
                                    setCookie("id_user", j.id, 365);
                                    setCookie("cookie", j.cookie, 365);
                                    $('#name_of_user').html("Xin chào, " + j.name);   
                                    $('#balance').html("Số dư: " + '<span>' + j.balance + '</span>');
                                    $('.nologin button').css("display", "none");
                                    $('.logged button').css("display", "block");
                                    check_login = true;
                                    location.reload();
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

    $('#setting').on('click', function () {
        $.post("API.aspx",
            {
                action: 'checklogin',
                id_user: id_user,
                cookie: cookie
            },
            function (data) {
                var j = JSON.parse(data);
                if (j.ok) {                   
                    var dialog_login = $.dialog({
                        title: 'Setting',
                        columnClass: 'large',
                        content: `
                            <div class="mb-4 bg-body-tertiary rounded-3">
                              <div class="container-fluid">
                                <h1 class="display-6 fw-bold p-4">Sửa thông tin người dùng</h1>     
                                <div class="form-floating mb-3 mt-3">
                                  <input type="text" class="form-control" id="name" placeholder="Enter name" value="${j.name}">
                                  <label>Name</label>
                                </div>
                                <div class="form-floating mb-3 mt-3">
                                  <input type="text" class="form-control" id="email" placeholder="Enter email" value="${j.email}">
                                  <label>Email</label>
                                </div>
                                <button class="btn btn-primary" id="modify" type="button">Sửa</button> 
                                <script>
                                    $('#modify').on('click', function(){
                                        $.post("API.aspx",
                                        {
                                            action: 'modify',
                                            id: id_user,
                                            name: $('#name').val(),
                                            email: $('#email').val(),
                                        },
                                        function (data) {
                                            var j = JSON.parse(data);
                                            if (j.ok) {
                                                $.alert("Sửa đổi thành công");                                               
                                            }
                                            else {
                                                $.alert("Sửa đổi thất bại: " + j.msg);
                                            }
                                        });
                                    });
                             </script>
                              </div>
                            </div>
                            <div class="mb-4 bg-body-tertiary rounded-3">
                              <div class="container-fluid">
                                <h1 class="display-6 fw-bold p-4">Đổi mật khẩu</h1>    
                                <div class="form-floating mt-3 mb-3">
                                  <input type="text" class="form-control" id="password" placeholder="Enter old password">
                                  <label >Old Password</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <input type="text" class="form-control" id="newpassword" placeholder="Enter new password">
                                  <label >New Password</label>
                                  <button class="btn btn-primary" id="changepw" type="button">Đổi mật khẩu</button>  
                                   <script>
                                    $('#changepw').on('click', function(){
                                        $.post("API.aspx",
                                        {
                                            action: 'changepw',
                                            email: '${j.email}',
                                            password: $('#password').val(),
                                            newpassword: $('#newpassword').val(),
                                        },
                                        function (data) {
                                            var j = JSON.parse(data);
                                            if (j.ok) {
                                                $.alert("Đổi mật khẩu thành công");    
                                                $('#password').html("");
                                                $('#newpassword').html("");
                                            }
                                            else {
                                                $.alert("Sửa đổi thất bại: " + j.msg);
                                            }
                                        });
                                    });
                                    </script>
                                </div>
                              </div>
                            </div>    
                            `
                        ,

                    });
                }
                else {
                    $.dialog("Lỗi gì đó");
                }
            });

        
    });

    $('#logout').on('click', function () {
        $.confirm({
            title: 'Đăng xuất!',           
            content: 'Bạn có muốn đăng xuất không ?',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Có',
                    btnClass: 'btn-red',
                    action: function () {
                        $.post("API.aspx",
                            {
                                action: 'logout',
                                id_user: $('#id_user').val(),
                                cookie: $('#cookie').val()
                            },
                            function (data) {
                                var j = JSON.parse(data);

                                if (j.ok) {
                                    eraseCookie("id_user");
                                    eraseCookie("cookie");
                                    $('#name_of_user').html("");
                                    $('#balance').html("");
                                    $('.nologin button').css("display", "block");
                                    $('.logged button').css("display", "none");
                                    $('.aciton_btn button').css("display", "none");
                                    check_login = false;
                                    id_user = null;
                                    cookie = null;
                                    $('.tablesor').html("");
                                    $.alert("Bạn đã đăng xuất thành công");
                                }
                                else {
                                    $.alert("Đăng xuất thất bại");                                    
                                }
                            });
                        
                    }
                },
                Không: function () {
                }
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
                                id_user: id_user,
                                name: $('#add_name').val(),
                                id_category: $('#add_category').val(),
                                money: $('#add_money').val(),
                                time: $('#add_time').val(),
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    $.alert("Thêm thành công");
                                    $('#balance span').html(parseInt($('#balance span').html()) + parseInt($('#add_money').val()));
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

    $('#add_expense').on('click', function () {

        $.confirm({
            title: 'Thêm',
            content: `
                        <div class="form-floating mb-3 mt-3">
                          <input type="text" class="form-control" id="add_name" placeholder="Enter name">
                          <label>Name</label>
                        </div>

                        <select class="form-select" aria-label="Default select example" id="add_category">
                          <option value="0" selected>Chọn một loại khoản chi</option>
                          <option value="1">Chi tiêu thiết yếu</option>
                          <option value="2">Chi tiêu cho sở thích và giải trí</option>
                          <option value="3">Chi tiêu cho tiết kiệm</option>
                          <option value="4">Chi tiêu cho đầu tư</option>
                          <option value="5">Chi tiêu phát sinh</option>
                          <option value="6">Khác</option>
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
                                action: 'add_expense',
                                id_user: id_user,
                                name: $('#add_name').val(),
                                id_category: $('#add_category').val(),
                                money: $('#add_money').val(),
                                time: $('#add_time').val(),
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    $.alert("Thêm thành công");
                                    $('#balance span').html(parseInt($('#balance span').html()) - parseInt($('#add_money').val()));
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

    $('#add_target').on('click', function () {

        $.confirm({
            title: 'Thêm',
            content: `
                        <div class="form-floating mb-3 mt-3">
                          <input type="text" class="form-control" id="add_name" placeholder="Enter name">
                          <label>Name</label>
                        </div>

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
                                action: 'add_target',
                                id_user: id_user,
                                name: $('#add_name').val(),
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

    $('#statistic_income').on('click', function () {
        $.dialog({
            title: 'Thống kê khoản chi',
            type: 'dark',
            typeAnimated: true,
            columnClass: 'xlarge',
            content: `
            <div class="d-flex">
                <select class="form-select choose_target" aria-label="Default select example" id="target_month">
                          <option value="0" selected>Chọn tháng</option>
                          <option value="1">Tháng 1</option>
                          <option value="2">Tháng 2</option>
                          <option value="3">Tháng 3</option>
                          <option value="4">Tháng 4</option>
                          <option value="5">Tháng 5</option>
                          <option value="6">Tháng 6</option>
                          <option value="7">Tháng 7</option>
                          <option value="8">Tháng 8</option>
                          <option value="9">Tháng 9</option>
                          <option value="10">Tháng 10</option>
                          <option value="11">Tháng 11</option>
                          <option value="12">Tháng 12</option>
                </select>
                <select class="form-select choose_target" aria-label="Default select example" id="target_year">
                          <option value="2022">Năm 2022</option>
                          <option value="2023" selected>Năm 2023</option>
                </select>
            </div>
            <div id="statistic_income_chart" style="width: 100%; height: 100%;"> </div>   
            <script>
                $('.choose_target').on('change', function (){
                    var target_month = $('#target_month').val();
                    var target_year = $('#target_year').val();
                    drawColumnChart("statistic_income",target_month, target_year,"statistic_income_chart");
                });
            </script>
            `,
            onAction: function () {
                
            },
            onContentReady: function () {
                var target_month = new Date().getMonth() + 1;
                var target_year = new Date().getFullYear();
                drawColumnChart("statistic_income", target_month, target_year, "statistic_income_chart");
            }
        });
    });

    $('#statistic_expense').on('click', function () {
        $.dialog({
            title: 'Thống kê khoản chi',
            type: 'dark',
            typeAnimated: true,
            columnClass: 'xlarge',
            content: `
            <div class="d-flex">
                <select class="form-select choose_target" aria-label="Default select example" id="target_month">
                          <option value="0" selected>Chọn tháng</option>
                          <option value="1">Tháng 1</option>
                          <option value="2">Tháng 2</option>
                          <option value="3">Tháng 3</option>
                          <option value="4">Tháng 4</option>
                          <option value="5">Tháng 5</option>
                          <option value="6">Tháng 6</option>
                          <option value="7">Tháng 7</option>
                          <option value="8">Tháng 8</option>
                          <option value="9">Tháng 9</option>
                          <option value="10">Tháng 10</option>
                          <option value="11">Tháng 11</option>
                          <option value="12">Tháng 12</option>
                </select>
                <select class="form-select choose_target" aria-label="Default select example" id="target_year">
                          <option value="2022">Năm 2022</option>
                          <option value="2023" selected>Năm 2023</option>
                </select>
            </div>
            <div id="statistic_expense_chart" style="width: 100%; height: 100%;"> </div>   
            <script>
                $('.choose_target').on('change', function (){
                    var target_month = $('#target_month').val();
                    var target_year = $('#target_year').val();
                    drawColumnChart("statistic_expense",target_month, target_year,"statistic_expense_chart");
                });
            </script>
            `,
            onAction: function () {

            },
            onContentReady: function () {
                var target_month = new Date().getMonth() + 1;
                var target_year = new Date().getFullYear();
                drawColumnChart("statistic_expense", target_month, target_year, "statistic_expense_chart");
            }
        });
    });

    $('#income_btn').on('click', function () {
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }
        else {
            $('#income_table').loading();
            income();
            $('.aciton_btn button').css("display", "block");
        }
    });
    $('#expense_btn').on('click', function () {
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }
        else {
            $('#expense_table').loading();
            expense();
            $('.aciton_btn button').css("display", "block");
        }
    });

    $('#target_btn').on('click', function () {
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }
        else {
            $('#target_table').loading();
            target();
            $('#add_target').css("display", "block");
        }
    });

    $('#home_btn').on('click', function () {
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }
        else {
            $('#home_chart').loading();
            home();
        }
    });

});
function ck_login(check_login) {
    if (!check_login) {
        if (checkCookie("id_user") && checkCookie("cookie")) {
            id_user = getCookie("id_user");
            cookie = getCookie("cookie")
            $.post("API.aspx",
                {
                    action: 'checklogin',
                    id_user: id_user,
                    cookie: cookie
                },
                function (data) {
                    var j = JSON.parse(data);
                    if (j.ok) {
                        $('#name_of_user').html("Xin chào, " + j.name);
                        $('#balance').html("Số dư: " + '<span>' + j.balance + '</span>');
                        $('.nologin button').css("display", "none");
                        $('.logged button').css("display", "block");
                        return true;
                    }
                    else {
                        return false;
                    }
                });
        }
        else {
            return false;
        }

    }      
}
function income() {
    $.post("API.aspx",
        {
            action: 'list_income',
            id_user: id_user,
        },
        function (data) {
            var j = JSON.parse(data);
            if (j.ok) {
                let stt = 0;
                var content = `                   
                    <table class="table table-hover myTable">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Money</th>
                            <th>Time</th>
                            <th>Sửa</th>
                            <th>Xoá</th>
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
                content += `</tbody></table>
                 <script>
                    $('.myTable').DataTable();
                </script>
                `;
                $('#income_table').html(content);
                $('#income_table').loading('stop');
            }
            else {
                $.alert("Tải thất bại: " + j.msg);
                $('#income_table').loading('stop');
            }

            $('.delete_btn').on('click', function () {
                let iid = $(this).attr("data-id");
                var income;
                for (var item of j.datas) {
                    if (item.id == iid) {
                        income = item;
                        break;
                    }
                }
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
                                            $('#balance span').html(parseInt($('#balance span').html()) - parseInt(income.money));
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
                var iid = $(this).attr("data-id");
                var income;
                for (var item of j.datas) {
                    if (item.id == iid) {
                        income = item;
                        break;
                    }
                }
                $.confirm({
                    title: 'Sửa',
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
                                            $('#balance span').html(parseInt($('#balance span').html()) + parseInt($('#modify_money').val()) - parseInt(income.money));
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
function expense() {
    $.post("API.aspx",
        {
            action: 'list_expense',
            id_user: id_user,
        },
        function (data) {
            var j = JSON.parse(data);
            if (j.ok) {
                let stt = 0;
                var content = `                   
                    <table class="table table-hover myTable">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Money</th>
                            <th>Time</th>
                            <th>Sửa</th>
                            <th>Xoá</th>
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
                content += `</tbody></table>
                 <script>
                    $('.myTable').DataTable();
                </script>
                `;
                $('#expense_table').html(content);
                $('#expense_table').loading('stop');
            }
            else {
                $.alert("Tải thất bại: " + j.msg);
                $('#income_table').loading('stop');
            }

            $('.delete_btn').on('click', function () {
                var iid = $(this).attr("data-id");
                var expense;
                for (var item of j.datas) {
                    if (item.id == iid) {
                        expense = item;
                        break;
                    }
                }
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
                                        action: 'delete_expense',
                                        id: iid,
                                    },
                                    function (data) {
                                        var j = JSON.parse(data);
                                        if (j.ok) {
                                            $.alert("Xoá thành công");
                                            $('#balance span').html(parseInt($('#balance span').html()) + parseInt(expense.money));
                                            expense();
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
                var iid = $(this).attr("data-id");
                var expense;
                for (var item of j.datas) {
                    if (item.id == iid) {
                        expense = item;
                        break;
                    }
                }
                $.confirm({
                    title: 'Sửa',
                    content: `
                        <div class="form-floating mb-3 mt-3">
                          <input type="text" class="form-control" id="modify_name" placeholder="Enter name" value="${expense.name}">
                          <label>Name</label>
                        </div>

                        <select class="form-select" aria-label="Default select example" id="modify_category">
                          <option value="0" selected>Chọn một loại khoản chi</option>
                          <option value="1">Chi tiêu thiết yếu</option>
                          <option value="2">Chi tiêu cho sở thích và giải trí</option>
                          <option value="3">Chi tiêu cho tiết kiệm</option>
                          <option value="4">Chi tiêu cho đầu tư</option>
                          <option value="5">Chi tiêu phát sinh</option>
                          <option value="6">Khác</option>
                        </select>

                        <div class="form-floating mt-3 mb-3">
                          <input type="number" class="form-control" id="modify_money" placeholder="Enter money" value="${expense.money}">
                          <label >Money</label>
                        </div>

                        <div class="form-floating mt-3 mb-3">
                          <input type="date" class="form-control" id="modify_time" placeholder="Enter time" value=${expense.time.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")}>
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
                                        action: 'modify_expense',
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
                                            $('#balance span').html(parseInt($('#balance span').html()) - parseInt($('#modify_money').val()) + parseInt(expense.money));
                                            expense();
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
function target() {
    $.post("API.aspx",
        {
            action: 'list_target',
            id_user: id_user,
        },
        function (data) {
            var j = JSON.parse(data);
            if (j.ok) {
                let stt = 0;
                var content = `                   
                    <table class="table table-hover myTable">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Money</th>
                            <th>Time</th>
                            <th>Sửa</th>
                            <th>Xoá</th>
                        </tr>
                        </thead>
                        <tbody>`;
                for (let i of j.datas) {
                    content += '<tr>' +
                        '<td>' + ++stt + '</td>' +
                        '<td>' + i.name + '</td>' +
                        '<td>' + i.money + '</td>' +
                        '<td>' + i.time + '</td>' +
                        '<td><button type="button" class="btn btn-warning modify_btn" data-id=' + i.id + '>Sửa</button></td>' +
                        '<td><button type="button" class="btn btn-danger delete_btn" data-id=' + i.id + '>Xoá</button></td>' +
                        '</tr>';
                }
                content += `</tbody></table>
                 <script>
                    $('.myTable').DataTable();
                </script>
                `;
                $('#target_table').html(content);
                $('#target_table').loading('stop');
            }
            else {
                $.alert("Tải thất bại: " + j.msg);
                $('#income_table').loading('stop');
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
                                        action: 'delete_target',
                                        id: iid,
                                    },
                                    function (data) {
                                        var j = JSON.parse(data);
                                        if (j.ok) {
                                            $.alert("Xoá thành công");
                                            target();
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
                let target;
                for (var item of j.datas) {
                    if (item.id == iid) {
                        target = item;
                        break;
                    }
                }
                $.confirm({
                    title: 'Sửa',
                    content: `
                        <div class="form-floating mb-3 mt-3">
                          <input type="text" class="form-control" id="modify_name" placeholder="Enter name" value="${target.name}">
                          <label>Name</label>
                        </div>

                        <div class="form-floating mt-3 mb-3">
                          <input type="number" class="form-control" id="modify_money" placeholder="Enter money" value="${target.money}">
                          <label >Money</label>
                        </div>

                        <div class="form-floating mt-3 mb-3">
                          <input type="date" class="form-control" id="modify_time" placeholder="Enter time" value=${target.time.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")}>
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
                                        action: 'modify_target',
                                        id: iid,
                                        name: $('#modify_name').val(),
                                        money: $('#modify_money').val(),
                                        time: $('#modify_time').val(),
                                    },
                                    function (data) {
                                        var j = JSON.parse(data);
                                        if (j.ok) {
                                            $.alert("Sửa thành công");
                                            target();
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
function home() {
    $.post("API.aspx",        
        {
            action: "statistic_general", 
            id_user: id_user             
        },
        function (data) {       
            var json = JSON.parse(data);
            if (json.ok) {
                var inc = [];
                var exp = [];
                for (var item of json.income) {
                    var name = item.name;
                    var total = item.total;
                    inc.push([name, total])
                }
                for (var item of json.expense) {
                    var name = item.name;
                    var total = item.total;
                    exp.push([name, total])
                }
                drawPieChart(inc, 'Tổng nguồn thu', 'chart_income');
                drawPieChart(exp, 'Tổng khoản chi', 'chart_expense');
                $('#home_chart').loading('stop');
            }
            else {
                $.alert("Lỗi thì phải:" + json.msg);
                $('#home_chart').loading('stop');
            }
        })
}
function drawPieChart(arr,title,id_chart) {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'ok');
        data.addColumn('number', 'gege');
        data.addRows(arr);

        // Set chart options
        var options = {
            'title': title,
        'width': 500,
        'height': 500
        };

        // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(id_chart));
        chart.draw(data, options);
}
function drawColumnChart(action,target_month,target_year,id_chart) {
    var arr = [];
    arr.push(["Day", "Money", { role: "style" }]);
    $.post("API.aspx",
        {
            action: action,
            id_user: id_user,
            target_month: target_month,
            target_year: target_year
        },
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                var ini = 0;
                for (var i = 0; i < 31; i++) {
                    var item = json.datas[ini];
                    var value = json.datas[ini]?.day;
                    if (value == i) {
                        var dayy = item.day.toString();
                        var money = item.money;
                        var style = "#76A7FA";
                        arr.push([dayy, money, style]);
                        ini++;
                    }
                    else {
                        arr.push([i.toString(), 0, style]);
                    }
                }
                var data = google.visualization.arrayToDataTable(arr);
                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1,
                    {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2]);

                var options = {
                    title: 'Thống kê khoản chi tháng ' + target_month + ' năm ' + target_year,
                    width: 1150,
                    height: 400,
                    bar: { groupWidth: "95%" },
                    legend: { position: "none" },
                };
                var chart = new google.visualization.ColumnChart(document.getElementById(id_chart));
                chart.draw(view, options);
            }
            else {
                $('#'+id_chart).html("KHÔNG CÓ DỮ LIỆU");
            }
        });
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(name) {
    let user = getCookie(name);
    if (user != "") {
        return true;
    } else {
        return false;
    }
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
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
