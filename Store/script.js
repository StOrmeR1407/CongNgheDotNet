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
                  <input type="text" class="form-control" id="password" placeholder="Enter password">
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
                                    $('#login').css("display", "none");
                                    $('#signup').css("display", "none");
                                    $('#logout').css("display", "block");
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
                                    $('#login').css("display", "block");
                                    $('#signup').css("display", "block");
                                    $('#logout').css("display", "none");
                                    $('.aciton_btn').css("display", "none");
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
                          <input type="text" class="form-control" id="modify_name" placeholder="Enter name">
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
                          <input type="number" class="form-control" id="modify_money" placeholder="Enter money">
                          <label >Money</label>
                        </div>

                        <div class="form-floating mt-3 mb-3">
                          <input type="date" class="form-control" id="modify_time" placeholder="Enter time">
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
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }
        else {
            $('#income_table').loading();
            income();
            $('#add_income').css("display", "block");
        }
    });

    $('#expense_btn').on('click', function () {
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }
        else {
            $('#expense_table').loading();
            expense();
            $('#add_expense').css("display", "block");
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
                        $('#login').css("display", "none");
                        $('#signup').css("display", "none");
                        $('#logout').css("display", "block");
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
                    $(".myTable").tablesorter();
                </script>
                `;
                $('#income_table').html(content);
                $('#income_table').loading('stop');
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
                                            return income();
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
                    $(".myTable").tablesorter();
                </script>
                `;
                $('#expense_table').html(content);
                $('#expense_table').loading('stop');
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
                                        action: 'delete_expense',
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
                let expense;
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
                                            return income();
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
            drawChart(inc, 'Tổng nguồn thu', 'chart_income');
            drawChart(exp, 'Tổng khoản chi', 'chart_expense');
            $('#home_chart').loading('stop');
        })
}

function drawChart(inc,a,b) {
        google.charts.load('current', { packages: ['corechart', 'timeline'] });
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'ok');
        data.addColumn('number', 'gege');
        data.addRows(inc);

        // Set chart options
        var options = {
            'title': a,
        'width': 500,
        'height': 500
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById(b));
        chart.draw(data, options);
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
