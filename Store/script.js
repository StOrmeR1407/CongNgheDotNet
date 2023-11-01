$(document).ready(function () {
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
                            function (data) {;
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