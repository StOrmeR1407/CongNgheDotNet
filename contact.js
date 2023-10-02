$(document).ready(function () {
    $("#getallcontact").click(function () {
        $.get("http://127.0.0.1:1880/contact",
            {},
            function (json) {  
                var result = '<table class="table table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col">Mã người dùng</th>'   + 
                    '<th scope="col">Tên người dùng</th>'    +
                    '<th scope="col">Số điện thoại</th>'  +  
                    '</tr>' +
                    '</thead>'  + 
                    '<tbody>';
                for (var user of json) {
                    result += '<tr class="data_row">' +
                        '<th scope="row">' + user.id + '</th>' +
                        '<td>' + user.TenKH + '</td>' +
                        '<td><a href= tel:"' + user.SDT + '" >' + user.SDT + '</a></td>' +
                        '</tr>';
                }
                result += '</tbody>' +
                          '</table>';
                $('#kq').html(result);
            });
    });

    $("#search_contact").keyup(function () {
        var filter = document.getElementById("search_contact").value.toUpperCase();

        var data_row = document.getElementsByClassName("data_row");
        
        for (var i = 0; i < data_row.length; i++) {
            var data_td1 = data_row[i].getElementsByTagName("td")[0].innerHTML.toUpperCase();
            var data_td2 = data_row[i].getElementsByTagName("td")[1].innerHTML.toUpperCase();

            if (data_td1.indexOf(filter) > -1 || data_td2.indexOf(filter) > -1) {
                data_row[i].style.display = "";
            }
            else {
                data_row[i].style.display = "none";
            }
        }
    });

});