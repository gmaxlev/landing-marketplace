$(document).ready(function() {
  function formCrm(formData, dataHref) {
    window.oncesended = false;
    $href = dataHref;

    $.ajax({
      url:
        "https://dev.salesevolution.ru/amo/integrators/xmlreactor/hook.php?config=2",
      type: "POST",
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
  }
  window.formCrm = formCrm;
});
