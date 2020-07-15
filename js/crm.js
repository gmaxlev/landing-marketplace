$(document).ready(function() {

 $(".form-modal-1").submit(function() {
    window.oncesended = false;
    $(this).find('button').attr("disabled", true);
    $href = $(this).attr('data-href');
    var formData = new FormData(this);

    $.ajax({
        url: 'https://dev.salesevolution.ru/amo/integrators/xmlreactor/hook.php?config=2',
        type: 'POST',
        data: formData,
        cache: false,
        success: SuccessSend(),
        contentType: false,
        processData: false
    });



    function SuccessSend() {

        if (window.oncesended) {
            alert("Жмём ОК для завершения регистрации");
            window.location.href = $href;
        }
        window.oncesended = true;
    }
    })
    });