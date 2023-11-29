$(document).ready(function () {
    var check_login = false;
    var id_user, cookie, type;
    check_login = ck_login(check_login);

    $('#login').on('click', function () {
        var dialog_login = $.confirm({
            title: 'Đăng nhập!',
            content: `
                <div class="form-floating mb-3 mt-3">
                  <input type="text" class="form-control" id="email" placeholder="Enter email">
                  <label>Email</label>
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
                        $.post("api.aspx",
                            {
                                action: 'login',
                                email: $('#email').val(),
                                password: $('#password').val()
                            },
                            function (data) {
                                var j = JSON.parse(data);

                                if (j.ok) {
                                    if (j.type == 1) {
                                        $('#statistic_btn').css("display", "none");
                                    }
                                    $.alert("Đăng nhập thành công");
                                    setCookie("id_user", j.id, 365);
                                    setCookie("cookie", j.cookie, 365);
                                    setCookie("type", j.type, 365);
                                    $('#name_of_user').html("Xin chào, " + j.name);
                                    $('#login').css("display", "none");
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
                                    $('#login').css("display", "block");
                                    $('#logout').css("display", "none");
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

    $('#setting').on('click', function () {
        var dialog_settings = $.dialog({
            title: 'Setting',
            columnClass: 'large',
            content: `
            <div class="mb-4 bg-body-tertiary rounded-3">
                <div class="container-fluid">
                    <h1 class="display-6 fw-bold p-4" style="font-size: 1.5rem;">Sửa thông tin người dùng</h1>
                    <div class="form-floating mb-3 mt-3">
                        <input type="text" class="form-control" id="name" placeholder="Enter name" value="">
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating mb-3 mt-3">
                        <input type="text" class="form-control" id="email" placeholder="Enter email" value="">
                        <label for="email">Email</label>
                    </div>
                    <button class="btn btn-primary" id="modify" type="button">Sửa</button>
                </div>
            </div>
            <div class="mb-4 bg-body-tertiary rounded-3">
                <div class="container-fluid">
                    <h1 class="display-6 fw-bold p-4" style="font-size: 1.5rem;">Đổi mật khẩu</h1>
                    <div class="form-floating mt-3 mb-3">
                        <input type="text" class="form-control" id="password" placeholder="Enter old password">
                        <label for="password">Old Password</label>
                    </div>
                    <div class="form-floating mt-3 mb-3">
                        <input type="text" class="form-control" id="newpassword" placeholder="Enter new password">
                        <label for="newpassword">New Password</label>
                    </div>
                    <button class="btn btn-primary" id="changepw" type="button">Đổi mật khẩu</button>
                </div>
            </div>
        `,
            onContentReady: function () {
                $('#modify').on('click', function () {
                    $.post("api.aspx",
                        {
                            action: 'login',
                            email: $('#email').val(),
                            password: $('#password').val()
                        },
                        function (data) {
                            var j = JSON.parse(data);

                            if (j.ok) {
                                $.alert("Đăng nhập thành công");
                                setCookie("id_user", j.id, 365);
                                setCookie("cookie", j.cookie, 365);
                                setCookie("type", j.type, 365);
                                $('#name_of_user').html("Xin chào, " + j.name);
                                $('#login').css("display", "none");
                                $('#logout').css("display", "block");
                                check_login = true;
                                review(type);
                            }
                            else {
                                $.alert("Đăng nhập thất bại");
                                dialog_login.open();
                            }
                        });
                });

                $('#changepw').on('click', function () {
                    // Code để xử lý sự kiện đổi mật khẩu ở đây
                    $.alert("Đổi mật khẩu thành công");
                    $('#password').val("");
                    $('#newpassword').val("");
                });
            }
        });
    });

    $('.ctlhp').on('click', function () {
        $.dialog({
            title: 'Chi tiết lớp học phần',
            columnClass: 'large',
            content: `<div>
            <button type="button" class="btn btn-primary modify_btn sua">THÊM</button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">MÃ LỚP HỌC PHẦN</th>
                    <th scope="col">TÊN MÔN HỌC</th>
                    <th scope="col">GIÁO VIÊN</th>
                    <th scope="col">SỬA</th>
                    <th scope="col">XOÁ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>K56KMT</td>
                    <td>LẬP TRÌNH JAVA</td>
                    <td>NGUYỄN THỊ A</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>K56KMT</td>
                    <td>LẬP TRÌNH C++</td>
                    <td>NGUYỄN THỊ B</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>K56KMT</td>
                    <td>LẬP TRÌNH PYTHON</td>
                    <td>NGUYỄN VĂN CHUNG</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>

                <tr>
                    <td>1</td>
                    <td>K56KMT</td>
                    <td>LẬP TRÌNH NHÚNG</td>
                    <td>NGUYỄN VĂN HUY</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>
            </tbody>
            </table> 
        </div>`,
        });
    });

    $('.ctchks').on('click', function () {
        $.dialog({
            title: 'Chi tiết câu hỏi khảo sát',
            columnClass: 'large',
            content: `<div>
            <button type="button" class="btn btn-primary modify_btn sua">THÊM</button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">CÂU HỎI</th>
                    <th scope="col">LOẠI</th>
                    <th scope="col">SỬA</th>
                    <th scope="col">XOÁ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Đạo đức nhà giáo</td>
                    <td>Phẩm chất nhà giáo</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Sử dụng phương pháp dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh</td>
                    <td>Phát triển chuyên môn, nghiệp vụ</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Xây dựng văn hóa nhà trường</td>
                    <td>Xây dựng môi trường giáo dục</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>

                <tr>
                    <td>4</td>
                    <td>Tạo dựng mối quan hệ hợp tác với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan</td>
                    <td>Phát triển mối quan hệ giữa nhà trường, gia đình và xã hội</td>
                    <td><button type="button" class="btn btn-warning modify_btn sua">SỬA</button></td>
                    <td><button type="button" class="btn btn-danger delete_btn xoa">XOÁ</button></td>
                </tr>
            </tbody>
            </table> 
        </div>`,
        });
    });

    $('#review_btn').on('click', function () {
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }      
    });

    $('#statistic_btn').on('click', function () {
        if (check_login == false) {
            $.alert("Cần phải đăng nhập trước");
        }
    });
});

function review(type) {
    if (type == 1) {
        $.post("api.aspx",
            {
                action: 'list_review_for_student',
                id_user: id_user
            },
            function (data) {
                var j = JSON.parse(data);
                if (j.ok == true) {
                    var stt = 0;
                    var content = `<table class="table table-hover myTable">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Mã lớp học phần</th>
                            <th>Tên môn học</th>
                            <th>Giáo viên</th>
                            <th>Deadline</th>
                        </tr>
                        </thead>
                        <tbody>`;
                    for (let i of j.datas) {
                        content += '<tr class="list_review_question_for_student" data-id=' + i.id + '>' +
                            '<td>' + ++stt + '</td>' +
                            '<td>' + i.name + '</td>' +
                            '<td>' + i.cos + '</td>' +
                            '<td>' + i.course + '</td>' +
                            '<td>' + i.teacher + '</td>' +
                            '<td>' + i.time + '</td>' +                            
                            '</tr>';
                    }
                    content += `</tbody></table>
                 <script>
                    $('.myTable').DataTable();
                </script>
                `;
                    $('#container-review').html(content);

                    $('.list_review_question_for_student').on('click', function () {
                        var iid = $(this).attr("data-id");
                        $.post("api.aspx",
                            {
                                action: 'list_review_question_for_student',
                                id_rv: iid,
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    var stt = 0;
                                    var content = `
                                    <table class="table table-hover myTable">
                                        <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Câu hỏi</th>
                                            <th>Đánh giá</th>
                                        </tr>
                                        </thead>
                                        <tbody>`;
                                    for (let i of j.datas) {
                                        content += '<tr>' +
                                            '<td>' + ++stt + '</td>' +
                                            '<td>' + i.name + '</td>' +
                                            '<td>' +
                                            '<span><i class="fa fa-star"></i>' +
                                            '<span><i class="fa fa-star"></i>' +
                                            '<span><i class="fa fa-star"></i>' +
                                            '<span><i class="fa fa-star"></i>' +
                                            '<span><i class="fa fa-star"></i>' +
                                            '</td>' +       
                                            '</tr>';
                                    }
                                    content += `</tbody></table>
                                         <script>
                                            $('.myTable').DataTable();
                                        </script>
                                    `;
                                    $.confirm({
                                        title: 'Danh sách câu hỏi khảo sát',
                                        content: content,
                                        columnClass: 'large',
                                        button: {
                                            formSubmit: {
                                                text: 'Submit',
                                                btnClass: 'btn-blue',
                                                action: function () {
                                                    
                                                }
                                            },
                                            cancel: function () {

                                            },
                                        },
                                            
                                    });

                                }
                                else {
                                    $.alert("Tải thất bại: " + j.msg);
                                }

                            }
                        );
                    });
                }

                else {
                    $.alert("Lỗi gì đó: " + j.msg);
                }
            });
    }
    else if (type == 0) {
        $.post("api.aspx",
            {
                action: 'list_review_for_admin'
            },
            function (data) {
                var j = JSON.parse(data);
                if (j.ok == true) {
                    var stt = 0;
                    var content = `<table class="table table-hover myTable">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Deadline</th>
                            <th>Chi tiết lớp học phần</th>
                            <th>Chi tiết câu hỏi khảo sát</th>
                            <th>Sửa</th>
                            <th>Xoá</th>
                        </tr>
                        </thead>
                        <tbody>`;
                    for (let i of j.datas) {
                        content += '<tr>' +
                            '<td>' + ++stt + '</td>' +
                            '<td>' + i.name + '</td>' +
                            '<td>' + i.deadline + '</td>' +
                            '<td><button type="button" class="btn btn-info list_detail_cos_btn" data-id=' + i.id + '>Chi tiết</button></td>' +
                            '<td><button type="button" class="btn btn-info list_detail_review_btn" data-id=' + i.id + '>Chi tiết</button></td>' +
                            '<td><button type="button" class="btn btn-warning modify_btn" data-id=' + i.id + '>Sửa</button></td>' +
                            '<td><button type="button" class="btn btn-danger delete_btn" data-action="delete_review" data-id=' + i.id + '>Xoá</button></td>' +
                            '</tr>';
                    }
                    content += `</tbody></table>
                     <script>
                        $('.myTable').DataTable();
             
                    </script>
                    `;
                    $('#container-review').html(content);

                    $('.list_detail_cos_btn').on('click', function () {
                        var iid = $(this).attr("data-id");
                        $.post("api.aspx",
                            {
                                action: 'list_detail_cos_review',
                                id_rv: iid,
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    var stt = 0;
                                    var content = `
                                    <button type="button" class="btn btn-primary">Thêm lớp</button>
                                    <table class="table table-hover myTable">
                                        <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã lớp học phần</th>
                                            <th>Giáo viên</th>
                                            <th>Môn học</th>
                                            <th>Xoá</th>
                                        </tr>
                                        </thead>
                                        <tbody>`;
                                        for (let i of j.datas) {
                                            content += '<tr>' +
                                                '<td>' + ++stt + '</td>' +
                                                '<td>' + i.id + '</td>' +
                                                '<td>' + i.teacher + '</td>' +
                                                '<td>' + i.course + '</td>' +
                                                '<td><button type="button" class="btn btn-danger delete_btn" data-action="delete_detail_cos_review" data-id=' + i.id + '>Xoá</button></td>' +
                                                '</tr>';
                                        }
                                        content += `</tbody></table>
                                         <script>
                                            $('.myTable').DataTable();
                                        </script>
                                    `;
                                    $.dialog({
                                        title: 'Danh sách lớp học phần có trong khảo sát',
                                        content: content,
                                        columnClass: 'large'
                                    });

                                }
                                else {
                                    $.alert("Tải thất bại: " + j.msg);
                                }
                                
                            }
                        );
                        
                    });

                    $('.list_detail_review_btn').on('click', function () {
                        var iid = $(this).attr("data-id");
                        $.post("api.aspx",
                            {
                                action: 'list_detail_review',
                                id_rv: iid,
                            },
                            function (data) {
                                var j = JSON.parse(data);
                                if (j.ok) {
                                    var stt = 0;
                                    var content = `
                                    <button type="button" class="btn btn-primary">Thêm câu hỏi khảo sát</button>
                                    <table class="table table-hover myTable">
                                        <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Nội dung câu hỏi</th>
                                            <th>Phân loại</th>
                                            <th>Xoá</th>
                                        </tr>
                                        </thead>
                                        <tbody>`;
                                    for (let i of j.datas) {
                                        content += '<tr>' +
                                            '<td>' + ++stt + '</td>' +
                                            '<td>' + i.name + '</td>' +
                                            '<td>' + i.category + '</td>' +
                                            '<td><button type="button" class="btn btn-danger delete_btn" data-action="delete_detail_cos_review" data-id=' + i.id + '>Xoá</button></td>' +
                                            '</tr>';
                                    }
                                    content += `</tbody></table>
                                         <script>
                                            $('.myTable').DataTable();
                                        </script>
                                    `;
                                    $.dialog({
                                        title: 'Danh sách lớp học phần có trong khảo sát',
                                        content: content,
                                        columnClass: 'large'
                                    });

                                }
                                else {
                                    $.alert("Tải thất bại: " + j.msg);
                                }

                            }
                        );

                    });

                    $('.modify_btn').on('click', function () {
                        var iid = $(this).attr("data-id");
                        var review;
                        for (var item of j.datas) {
                            if (item.id == iid) {
                                review = item;
                                break;
                            }
                        }
                        $.confirm({
                            title: 'Sửa',
                            content: `
                        <div class="form-floating mb-3 mt-3">
                          <input type="text" class="form-control" id="modify_name" placeholder="Enter name" value="${review.name}">
                          <label>Name</label>
                        </div>

                        <div class="form-floating mt-3 mb-3">
                          <input type="date" class="form-control" id="modify_time" placeholder="Enter time" value=${review.deadline.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")}>
                          <label >Deadline</label>
                        </div>
                        `,
                            buttons: {
                                delete: {
                                    text: 'Sửa',
                                    btnClass: 'btn-warning',
                                    action: function () {
                                        $.post("api.aspx",
                                            {
                                                action: 'modify_review',
                                                id: iid,
                                                name: $('#modify_name').val(),
                                                deadline: $('#modify_time').val(),
                                            },
                                            function (data) {
                                                var j = JSON.parse(data);
                                                if (j.ok) {
                                                    $.alert("Sửa thành công");                                                  
                                                    
                                                }
                                                else {
                                                    $.alert("Sửa thất bại: " + j.msg);
                                                }
                                                refresh(type);
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

                else {
                    $.alert("Lỗi gì đó: " + j.msg);
                }
            });
    }
}
function refresh(type) {
    review(type);
}

function statistic() {
    $.post("api.aspx",
        {
            action: 'statistic_general',
        },
        function (data) {
            var j = JSON.parse(data);
            if (j.ok) {
                var stt = 0;
                var content = `<table class="table table-hover myTable">
                        <thead>
                        <tr >
                            <th>STT</th>
                            <th>Giáo viên</th>
                            <th>Mã lớp học phần</th>
                            <th>Tên môn học</th>
                            <th>Điểm trung bình</th>
                        </tr>
                        </thead>
                        <tbody>`;
                for (let i of j.datas) {
                    content += '<tr class="statistic_general_detail" data-id=' + i.cos + '>' +
                        '<td>' + ++stt + '</td>' +
                        '<td>' + i.teacher + '</td>' +
                        '<td>' + i.cos + '</td>' +
                        '<td>' + i.course + '</td>' +
                        '<td>' + i.avr_score + '</td>' +
                        '</tr>';
                }
                content += `</tbody></table>
                 <script>
                    $('.myTable').DataTable();
                </script>
                `;
                $('#container-statistic').html(content);

                $('.statistic_general_detail').on('click', function () {
                    var iid = $(this).attr("data-id");
                    $.post("api.aspx",
                        {
                            action: 'statistic_general_detail',
                            id_cos : iid
                        },
                        function (data) {
                            var j = JSON.parse(data);
                            if (j.ok) {
                                var stt = 0;
                                var content = `<table class="table table-hover myTable">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Danh mục</th>
                                        <th>Điểm đánh giá</th>
                                    </tr>
                                    </thead>
                                    <tbody>`;
                                for (let i of j.datas) {
                                    content += '<tr>' +
                                        '<td>' + ++stt + '</td>' +
                                        '<td>' + i.teacher + '</td>' +
                                        '<td>' + i.avr_score + '</td>' +
                                        '</tr>';
                                }
                                content += `</tbody></table>
                                 <script>
                                    $('.myTable').DataTable();
                                </script>
                                `;
                                $.dialog({
                                    title: 'Chi tiết điểm khảo sát',
                                    content: content,
                                    columnClass: 'large',
                                });
                            }
                            else {
                                $.alert("Lỗi thì phải:" + msg);
                            }
                     });
                });

            }
            else {
                $.alert("Lỗi thì phải: " + j.msg);
            }
        });
}
function ck_login(check_login) {
    if (!check_login) {
        if (checkCookie("id_user") && checkCookie("cookie")) {
            id_user = getCookie("id_user");
            cookie = getCookie("cookie");
            type = getCookie("type");
            $.post("api.aspx",
                {
                    action: 'checklogin',
                    id_user: id_user,
                    cookie: cookie
                },
                function (data) {
                    var j = JSON.parse(data);
                    if (j.ok) {
                        if (j.type == 1) {
                            $('#statistic_btn').css("display", "none");
                        }
                        else {
                            statistic();
                        }
                        $('#name_of_user').html("Xin chào, " + j.name);
                        $('#login').css("display", "none");
                        $('#logout').css("display", "block");
                        review(type);
                        
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



// Hàm để tạo HTML cho câu hỏi và lựa chọn
function generateSurveyHTML(questions) {
    var html = '';
    questions.forEach(function (q, index) {
        html += '<div>';
        html += '<p>' + q.question + '</p>';
        html += '<div class="star-rating">';
        q.choices.forEach(function (choice) {
            html += '<span class="fa fa-star" onclick="setRating(this, ' + choice + ')"></span>';
        });
        html += '</div>';
        html += '</div>';
    });
    return html;
}

// Hàm để đặt giá trị đánh giá sao và chuyển màu sao
function setRating(star, rating) {
    star.classList.toggle('checked');
    var stars = star.parentNode.querySelectorAll('.fa-star');
    stars.forEach(function (s, index) {
        if (index < rating) {
            s.classList.add('checked');
        } else {
            s.classList.remove('checked');
        }
    });
}

// Hàm để lấy giá trị đánh giá sao
function getRatings() {
    var ratings = [];
    var starContainers = document.querySelectorAll('.star-rating');
    starContainers.forEach(function (container) {
        var stars = container.querySelectorAll('.checked');
        var rating = stars.length;
        ratings.push(rating.toString());
    });
    return ratings;
}
