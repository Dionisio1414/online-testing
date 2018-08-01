jQuery(function($) {
// Local storage(cookie) for registration form and validation + lucky modal
    if(!window.localStorage) alert("Local Storage не поддерживается Вашим браузером. Обновите браузер.");
    let $button_registration = $(".main .slider .reg-form input[type='submit']");
    let $all_input = $(".main .slider .reg-form :input").not($button_registration);
    
    // my cabinet
    let $name_cabinet = $(".cabinet-block .user-view p:first-child");
    let $field_name = $(".cabinet-block .user-form .change-form form input#name-user");
    
    copyTo($field_name, $name_cabinet);
    
    // Custom Modal
    $.fn.luckyModal = function() {
        $(this).click(function() {
            let $message = `<p>Поздравляем! Вы успешно прошли регистрацию!</p>
                            <p>Последним шагом будет пройти авторизацию.</p>`;
			//event.preventDefault();
            $('.modal_form_reg').append($message);
			$('.overlay_reg').fadeIn(400,
				function() {
					$('.modal_form_reg')
									.css('display', 'block')
									.animate({opacity: 1, top: '50%'}, 200);
				
            });
        });
        $('.modal_close_reg, .overlay_reg').click(function() {
		  $('.modal_form_reg')
						.animate({opacity: 0, top: '45%'}, 200,
								function() {
									$(this).css('display', 'none');
									$('.overlay_reg').fadeOut(400);
								}
		
                        );
        });
    }
    
    $('#registration_form').submit(function(e) {
        e.preventDefault();
        setRegStorage();
        $($button_registration).luckyModal();
//        return false;
    });
    
    
    // DIV Local Storage
    
    setTimeout(function() {
        $(".cookies").fadeIn();
    }, 10000);
    
    $(".cookies a.exit-cookie").removeAttr("href");
    $(".cookies a.exit-cookie").click(function() {
        $(".cookies").slideUp("slow");
    })
    
// ToggleMenu
    $('nav ul li.submenu').hover(
       function() {
           $(this).find('ul').slideDown(500);
       }, function() {
               $(this).find('ul').slideUp("slow");
    });

    // Preloader
    
    var $preloader = $('.preloader'),
    $spinner       = $preloader.find('.pre-img');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
    
    // buttonTop
    //$('body').append('<a href="#" class="link-in-top" title="Вверх">Вверх</a>');
    //var win = document.body.clientHeight / 2;
     $.fn.scrollToTop = function() {
            $(this).removeAttr("href");
            if ($(window).scrollTop() >= "50") $(this).show("slow");
            var scrollWindow = $(this);
            $(window).scroll(function() {
                if ($(window).scrollTop() <= "50") $(scrollWindow).fadeOut("fast");
                else $(scrollWindow).fadeIn("fast");
            });
            $(this).click(function() {
            $("html, body").animate({scrollTop: 0}, "slow");
        });
     }
    
    $("a.link-in-top").scrollToTop();
    
    
    //fixed header 
    $('header').removeClass("fixed");
    $(window).scroll(function() {
       if($(this).scrollTop() > 10) {
           $('header').addClass("fixed").fadeIn(1000);
       } else {
           $('header').removeClass("fixed").fadeIn(1000);
       }
    });
    
    // Gamburger
    
    $('.menu-icon').click(function() {
        var nav  = $("header").find("nav"),
            span = $("header").find(".menu-icon"); 
//        $(this).closest('nav').toggleClass('menu-state-open');
        $('nav ul li.submenu>ul').addClass('accordion');
        nav.toggleClass('menu-state-open');
        span.toggleClass('menu-state-open');
        
    });
    
    // Custom tabs for user cabinet
    $('.user-mnu ul.tabs').on('click', '.container-for-li:not(.active)', function() {
       var $user_form = $('.cabinet-block div.user-form');
       $(this).addClass('active').siblings().removeClass("active"); 
       $user_form.removeClass('active').eq($(this).index()).addClass('active');
       return false;
    });
    
    // Custom tab-test 
    let $radioBtn = $(".part-for-test form p input[type=radio]");
    $('.part-for-test form button').on('click', function() {
        for(let i = 0; i < $radioBtn.length; i++) {
            if($radioBtn.eq(i).is(":checked")) {
                alert("TRUE");
                // Dublicate
                $radioBtn.prop('checked', false);
            } else {
                continue;
            }
        }
        return false;
    });
    
    $('.col-tabs .tab-test').on('click', function() {
        $(this).addClass('active').siblings().removeClass("active");
        $('.part-for-test').removeClass('active').eq($(this).index()).addClass("active");
    });
    
    // preview description
    //var arrow = $("button.preview-btn-yet::after");
    $("button.preview-btn-yet").click(function() {
  //      arrow.toggleClass("top-arrow");
        $(".preview-description").slideToggle(1000);
        return false;
    });
    
    //owl carousel 
    $('.owl-carousel').owlCarousel({
        nav: true,
        items: 1,
        responsiveClass: true,
        dots: true,
        navText: ["<i class='fas fa-angle-right'></i>", "Зарегистрироваться"]
    });
});


/* Adding functions */
let setRegStorage = function() {
    let user   = 'User',
        fields = {
            userFullName: $('input[name="name"]').val(), // Name and Surname
            userLogin: $('input[name="login"]').val(),    // Login
            userEmail: $('input[name="email"]').val(),    // Email
            userPassword: $('input[name="password"]').val(), // Password
            userRepeatPassword: $('input[name="repeatpass"]').val() // Repeat password
        };
    
    try {
        localStorage.setItem(user, JSON.stringify(fields));
    } catch(e) {
        if(e == QUOTA_EXCEEDED_ERR) {
            alert("Лимит хранилища превышен.")
        }
    }
}

let clearStorage = function() {
    localStorage.clear();
}

/*
*
*   Validation
*
*/

function Validate() {
    // input's value
    // fieldsValue.call(this);
    // input's
    let $input_reg = $(".main .slider .reg-form :input");
    let $input_fullName = $(".main .slider .reg-form input[name='name']");
    let $input_login = $(".main .slider .reg-form input[name='login']");
    let $input_email = $(".main .slider .reg-form input[name='email']");
    let $input_password = $(".main .slider .reg-form input[name='password']");
    let $input_repeat_password = $(".main .slider .reg-form input[name='repeatpass']");
    let $reg_btn = $(".main .slider .reg-form input[type='submit']");
    
    // clear validation messages (helper function)
    let clearMessages = function(elem) {
        // validation block's
        //var args = arguments;
        setTimeout(function() {
            elem.remove();
        }, 5000);
    }
    
    let splitName = function(value) {
            let message = "<span>Введено полное имя</span>";
            let fullName = $input_fullName.val(), split = fullName.split(" "),
            name = split[0],
            surname = split[1];
            if(name && surname) {
                $input_fullName.addClass("isValidField").after("<div class='validBlock'>" + message + "</div>");
                clearMessages($("div.validBlock"));
                $input_reg.prop('disabled', false);
            } else {
                $input_fullName.removeClass("isValidField").after("<div class='invalidBlock'><span>Поле должно содержать имя и фамилию</span></div>");
                clearMessages($("div.invalidBlock"));
                $input_reg.not($input_fullName).prop('disabled', true);
            } if(/^[а-яА-ЯёЁ]+$/.test(name) && /^[а-яА-ЯёЁ]+$/.test(surname)) {
                $input_fullName.addClass("isValidField").after("<div class='validBlock'><span>Имя содержит кириллицу</span></div>");
                clearMessages($("div.validBlock"));
                $input_reg.prop('disabled', false);
            } else {
                $input_fullName.removeClass("isValidField").after("<div class='invalidBlock'><span>Поле должно содержать только кириллицу</span></div>");
                clearMessages($("div.invalidBlock"));
                $input_reg.not($input_fullName).prop('disabled', true);
            }
    }
    
    
    this.checkingFullName = function(field) {
        $input_fullName.change(function() {
            if($input_fullName.val() != "") {
                splitName(); 
            } else {
                $input_fullName.removeClass("isValidField").after("<div class='invalidBlock'><span>Поле должно быть заполнено</span></div>");
                clearMessages($("div.invalidBlock"));
                $input_reg.not($input_fullName).prop('disabled', true);
            }
        });
    }
    
    this.checkLogin = function(field) {
        $input_login.change(function() {
            let message = `<span>Логин должен содержать латинские буквы</span><br>
                           <span>Логин должен содержать минимум 6 символов</span>`;
            let log = field.val();
            if(/^[a-z0-9]{6,18}$/i.test(log)) {
                $input_login.addClass("isValidField").after("<div class='validBlock'><span>Логин валиден</span></div>");
                clearMessages($("div.validBlock"));
                $input_reg.prop('disabled', false);
            } else {
                $input_login.removeClass("isValidField").after("<div class='invalidBlock'>" + message + "</div>");
                clearMessages($("div.invalidBlock"));
                $input_reg.not($input_login).prop('disabled', true);
            }
        });
    }
    
    this.checkEmail = function(field) {
        $input_email.change(function() {
            let e = field.val();
            if(/.+@.+\..+/.test(e)) {
                $input_email.addClass("isValidField").after("<div class='validBlock'><span>Ваш email валиден</span></div>");
                clearMessages($("div.validBlock"));
                $input_reg.prop('disabled', false);
            } else {
                $input_email.removeClass("isValidField").after("<div class='invalidBlock'><span>Поле должно минимум иметь символ '@', и длмен верхнего уровня</span></div>");
                clearMessages($("div.invalidBlock"));
                $input_reg.not($input_email).prop('disabled', true);
            }
        });
    }
    
    this.repeatConfirmPassword = function(field) {
        let f_password = $input_password.val(), s_password = $input_repeat_password.val();
        if(f_password == s_password) {
            field.addClass("isValidField").after("<div class='validBlock'><span>Пароль совпал</span></div>");
            $reg_btn.prop('disabled', false);
         } else {
            field.removeClass("isInvalidField").after("<div class='invalidBlock'><span>Пароль не совпадает</span></div>");
             $reg_btn.prop('disabled', true);
         }
    }
    
    
    this.checkingPassword = function() {
        let message = `<span>Пароль должен содержать латинские буквы</span><br>
                       <span>Пароль должен содержать минимум 6 символов</span>`;
        $input_password.change(function() {
            let value_field = $input_password.val();
            if(/^[a-z0-9]{6,18}$/i.test(value_field)) {
                $input_password.addClass("isValidField").after("<div class='validBlock'><span>Пароль валиден</span></div>");
                clearMessages($("div.validBlock"));
                $input_reg.prop('disabled', false);
            } else {
                $input_password.removeClass("isValidField").after("<div class='invalidBlock'>" + message + "</div>");
                clearMessages($("div.invalidBlock"));
                $input_reg.not($input_password).prop('disabled', true);
            }
        });
    }
    
    // Result validation
    this.init = function() {
       let self = this;    
        
       this.checkingFullName($input_fullName.val());
       this.checkLogin($input_login);
       this.checkEmail($input_email);
       this.checkingPassword();
       $input_repeat_password.change(function() {
           self.repeatConfirmPassword($(this));
           clearMessages($("div.validBlock, div.invalidBlock"));
       });
    }
}

let validate = new Validate();
validate.init();


let copyTo = function(fromElem, toElem) {
    let elem = toElem;
    elem.html(fromElem.val());
}
    






