/* 
  Глобальные контрольные точки медиазпросов
*/
window._breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

$(document).ready(function() {  
  new WOW().init();

  /**
   * Мобильное меню
   */
  (function() {
    $(".open-mobile-menu").on("click", function(e) {
      e.preventDefault();
      $(this).toggleClass("open-mobile-menu_open");
      $(".mobmenu").toggleClass("mobmenu_show");
    });
    $(".mobmenu__item > a").on("click", function(e) {
      e.preventDefault();
      $(".open-mobile-menu").removeClass("open-mobile-menu_open");
      $(".mobmenu").removeClass("mobmenu_show");
    });
  })();

  /**
   * Слайдер "Отзывы"
   */
  (function() {
    var mySwiper = new Swiper("#reviews-slider-text", {
      slidesPerView: 1,
      effect: "fade",
      autoHeight: true,
      navigation: {
        nextEl: "#reviews-slider-next",
        prevEl: "#reviews-slider-prev"
      },
      pagination: {
        el: "#reviews-slider-pagination",
        clickable: true,
        renderBullet: function(index, className) {
          return '<span class="' + className + '"></span>';
        }
      }
    });
    setTimeout(function() {
      var mySwiper2 = new Swiper("#reviews-slider-video", {
        slidesPerView: 1,
        effect: "fade",
        autoHeight: true,
        navigation: {
          nextEl: "#reviews-slider-next",
          prevEl: "#reviews-slider-prev"
        },
        pagination: {
          el: "#reviews-slider-pagination",
          clickable: true,
          renderBullet: function(index, className) {
            return '<span class="' + className + '"></span>';
          }
        }
      });
    }, 1000);
  })();

  /**
   * Слайдер "Комментарии"
   */
  (function() {
    new Swiper("#slider-comments", {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: true,
      roundLengths: true,
      loop: true,
      loopAdditionalSlides: 30,
      breakpoints: {
        [_breakpoints["xl"]]: {
          slidesPerView: 4
        }
      }
    });
  })();

    /**
   * Слайдер "Примеры"
   */
  (function() {
    new Swiper("#slider-examples", {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: true,
      roundLengths: true,
      loop: true,
      loopAdditionalSlides: 30,
      breakpoints: {
        [_breakpoints["xl"]]: {
          slidesPerView: 4
        }
      }
    });
  })();

    /**
   * Слайдер "Магазини"
   */
  (function() {
    new Swiper("#slider-shops", {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      roundLengths: false,
      loop: false,
      navigation: {
        nextEl: "#shops-next",
        prevEl: "#shops-prev"
      },
      pagination: {
        el: "#shops-pagination",
        clickable: true,
        renderBullet: function(index, className) {
          return '<span class="' + className + '"></span>';
        }
      }
    });
  })();

  (function() {
    $("[data-iscollaps]").on("click", function(e) {
      e.preventDefault();
      $(this).toggleClass("collapse_open");
      $(this)
        .siblings(".collapse-drop")
        .slideToggle()
        .toggleClass("collapse-drop_open");
    });
  })();

  /**
   * Модальные формы
   */
  (function() {
    window.modalIsOpen = false;

    $("[data-modal]").on("click", function(e) {
      e.preventDefault();
      var id = $(this).attr("data-modal");
      openModal(id);
    });

    $(".modal-window__close").on("click", function(e) {
      e.preventDefault();
      var id = $(this)
        .closest(".modal")
        .attr("id");
      closeModal(id);
    });

    $(".modal").on("click", function(e) {
      var modal = $(e.target);
      if (modal.hasClass("modal")) {
        var id = modal.attr("id");
        closeModal(id);
      }
    });

    function openModal(id) {
      if (modalIsOpen) return;
      modalIsOpen = true;
      $("body, html").css("overflow", "hidden");
      $("#" + id).addClass("modal_show");
    }

    function closeModal(id) {
      var modal = $("#" + id);
      modal.removeClass("modal_show").addClass("modal_hide");
      setTimeout(function() {
        modalIsOpen = false;
        $("body, html").css("overflow", "auto");
        modal.removeClass("modal_hide");
      }, 1000);
    }
    window.openModal = openModal;
    window.closeModal = closeModal;
  })();

  /**
   * Сообщение об ошибке в форме
   */
  (function() {
    function showError(error, element) {
      if (
        $(element)
          .parent()
          .find(".input-error").length !== 0
      )
        return false;
      if ($(element).attr("name") == "name") {
        message = "Введите имя";
      } else if ($(element).attr("name") == "phone") {
        message = "Введите номер телефона";
      }
      $(element)
        .parent()
        .prepend("<div class='input-error'>" + message + "</div>");
      return true;
    }
    window.showError = showError;
  })();

  /**
   * Форма
   */
  (function() {
    $(".form-modal-1").each(function() {
      $(this)
        .submit(function(e) {
          e.preventDefault();
        })
        .validate({
          rules: {
            name: {
              required: {
                depends: function() {
                  $(this).val($.trim($(this).val()));
                  return true;
                }
              }
            },
            phone: {
              required: {
                depends: function() {
                  $(this).val($.trim($(this).val()));
                  return true;
                }
              },
              minlength: 10
            }
          },
          success: function(label, element) {
            $(element)
              .parent()
              .find(".input-error")
              .remove();
            return true;
          },
          errorPlacement: showError,
          submitHandler: function(form) {
            
           $.ajax({
              url: "send.php",
              type: "POST",
              data: {
                form: $(form).attr("name"),
                name: $(form)
                  .find('input[name ="name"]')
                  .val(),
                phone: $(form)
                  .find('input[name ="phone"]')
                  .val(),
                email: $(form)
                  .find('input[name ="email"]')
                  .val()
              },
              success: function() {
                $(form)
                  .find(".input-text, .textarea")
                  .prop("disabled", true)
                  .val("");
                $(form)
                  .find(".button")
                  .prop("disabled", true);
                $(form)
                  .siblings(".form-send-success")
                  .addClass("form-send-success_show");
               /* setTimeout(function() {
                  var id = $(form)
                    .closest(".modal")
                    .attr("id");
                  closeModal(id);
                }, 2000);*/
              },
              error: function() {
                $(form)
                  .siblings(".form-send-error")
                  .slideDown(500);
              }
              
            });

  
          }
        });
    });
  })();

  /**
   * Расписание мастер-класса
   */
  (function() {
    function changeView(id) {
      $(".modal-timetable__item").hide();
      $(".modal-timetable__item")
        .eq(id)
        .show();
      $(".modal-timetable__active").removeClass("modal-timetable__active");
      $(".modal-timetable__nav > span")
        .eq(id)
        .addClass("modal-timetable__active");
    }
    $(".modal-timetable__nav > span").on("click", function() {
      var id = $(this).index();
      changeView(id);
    });
    $("[data-timetable]").on("click", function() {
      var id = $(this).attr("data-timetable");
      changeView(id);
    });
  })();

  /**
   * Плавная прокрутка
   */
  (function() {
    $("[data-scrollto]").on("click", function(e) {
      e.preventDefault();
      var id = $(this).attr("data-scrollto");
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#" + id).offset().top
        },
        2000
      );
    });
  })();
});

