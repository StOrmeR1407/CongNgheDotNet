$(document).ready(function () {
    $('#add').on('click', function () {
        $.confirm({
            title: 'Tạo công ty mới',
            content: '' +
                '<div class="form-group">' +
                '<label>Nhập tên công ty</label>' +
                '<input type="text" placeholder="Your name" class="name form-control" id="name" required />' +
                '<label>Nhập địa chỉ công ty</label>' +
                '<input type="text" placeholder="Your address" class="name form-control" id="address" required />' +
                '<label>Nhập toạ độ lat</label>' +
                '<input type="text" placeholder="Your lat" class="name form-control" id="lat" required />' +
                '<label>Nhập toạ độ long</label>' +
                '<input type="text" placeholder="Your long" class="name form-control" id="lng" required />' +
                '<label>Nhập số điện thoại</label>' +
                '<input type="text" placeholder="Your phone" class="name form-control" id="phone" required />' +
                '<label>Nhập zalo</label>' +
                '<input type="text" placeholder="Your zalo" class="name form-control" id="zalo" required />' +
                '</div>',
            buttons: {
                formSubmit: {
                    text: 'Submit',
                    btnClass: 'btn-blue',
                    action: function () {
                        $.post("api.aspx",
                            {
                                action: 'add_company',
                                name: $('#name').val(),
                                address: $('#address').val(),
                                lat: $('#lat').val(),
                                lng: $('#lng').val(),
                                phone: $('#phone').val(),
                                zalo: $('#zalo').val()
                            },
                            function (data) {
                                $.alert(data);
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