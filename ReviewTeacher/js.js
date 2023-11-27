$(document).ready(function () {
    var check_login = false;
    var id_user, cookie;
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
                                    $.alert("Đăng nhập thành công");
                                    setCookie("id_user", j.id, 365);
                                    setCookie("cookie", j.cookie, 365);
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
                        $('#login').css("display", "none");
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