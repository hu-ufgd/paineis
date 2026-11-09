$(document).ready(function () {
    var $link = false;

    M.AutoInit();
    // MENU ANTIGO = Correções da barra de menu (pesquisa e menu responsivo)
    //    $("input.search-barra-menu").focusin(function () {
    //        $("i.material-icons.icone-pesquisa").css("left", "0px");
    //    });
    //    $("input.search-barra-menu").focusout(function () {
    //        if ($(this).val() == 0 || $(this).val() == null) {
    //            $("i.material-icons.icone-pesquisa").css({"left": "120px", "height": "0px"});
    //        } else {
    //            $("i.material-icons.icone-pesquisa").css("left", "0px");
    //        }
    //    });
    
    $(".dropdown-trigger").dropdown({constrainWidth: false});
    $(".tooltipped").tooltip({margin: 50});
    $(".datepicker").datepicker({
        i18n: {
            cancel: 'Cancelar',
            clear: 'Limpar',
            done: 'OK',
            previousMonth: '<',
            nextMonth: '>',
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
        },
        format: 'yyyy-mm-dd'});
    $(".timepicker").timepicker();

//    // adicionar sombra no navbar com scroll
//    $(window).scroll(function () {
//        if ($(window).scrollTop() > 5) {
//            $('#menu-topo').addClass('sombra-menu-topo');
//        } else {
//            $('#menu-topo').removeClass('sombra-menu-topo');
//        }
//    });

    $("#search").find("i").click(function () {
        $("#search").val("").change();
    });

    $("li.search").find("i").click(function () {
        $("#search").val("");
        $("#search").keyup();
        $("#search").blur();
    });
    

    // Exibindo prováveis textos de ajuda dos campos dos formulários
    // funcao da caixa de ajuda
//    $("input").on('focus', function () {
//        $titulo = $(this).closest("div").find("label").text();
//        $texto = $(this).attr("texto-ajuda");
//        $textoAjudaHtml = $.parseHTML($texto);
//        $left = $(this).offset().left + $(this).width() + 25;
//        $div = $(this).closest(".input-field");
//        if ($div.hasClass("required")) {
//            $(".helper").addClass("required-card");
//        } else {
//            $(".helper").removeClass("required-card");
//        }
//
//        if ($div.hasClass("readonly")) {
//            $(".helper").addClass("readonly-card");
//        } else {
//            $(".helper").removeClass("readonly-card");
//        }
//        if ($texto !== undefined) {
//            if ($texto.length > 0) {
//                $top = $(this).offset().top;
//                $(".helper").css({
//                    "top": $top,
//                    "left": $left,
//                    "display": "table"
//                });
//                $topTOC = ($(".helper").offset().top + $(".helper").height() + 15) - $(document).scrollTop();
//                $(".helper div div span").html($textoAjudaHtml);
//                $(".helper").fadeIn(300);
//            }
//        }//if $texto !== undefined
//    }).on('blur', function () {
//        if (!$link) {
//            $(".helper").fadeOut(0);
//        }
//    });
//    //adaptando os cards de ajuda para aparecerem quando o mouse passar sobre os checkboxes
//    $(":checkbox").siblings("span")
//            .on('mouseenter', function () {
//                console.log($(this).text());
//                $titulo = $(this).text();
//                $texto = $(this).siblings(":checkbox").eq(0).attr("texto-ajuda");
//                $textoAjudaHtml = $.parseHTML($texto);
//                $div = $(this).closest(".input-field");
//                $left = $div.offset().left + $div.width() + 25;
//                if ($div.hasClass("required")) {
//                    $(".helper").addClass("required-card");
//                } else {
//                    $(".helper").removeClass("required-card");
//                }
// 
//                if ($div.hasClass("readonly")) {
//                    $(".helper").addClass("readonly-card");
//                } else {
//                    $(".helper").removeClass("readonly-card");
//                }
//                if ($texto !== undefined) {
//                    if ($texto.length > 0) {
//                        $top = $(this).offset().top;
//                        $(".helper").css({
//                            "top": $top,
//                            "left": $left,
//                            "display": "table"
//                        });
//                        $topTOC = ($(".helper").offset().top + $(".helper").height() + 15) - $(document).scrollTop();
//                        $(".helper div div span").html($textoAjudaHtml);
//                        $(".helper").fadeIn(300);
//                    }
//                }//if $texto !== undefined
//            }).on('mouseleave', (function () {
//        if (!$link) {
//            $(".helper").fadeOut(0);
//        }
//    });
    $(document).on("mouseover", "a", function () {
        $link = true;
    });
    $(document).on("mouseleave", "a", function () {
        $link = false;
    });
    $(document).on("click", "a", function () {
        $(".helper").fadeOut(0);
        $link = false;
    });
    
    $("form").on('submit', function(){
        $btSubmit = $(this).find(".bt-enviar").eq(0);
        $btSubmit.text("Enviando dados...");
        $(this).find(".bt-enviar")
                .closest("div")
                .find("button")
                .not(".bt-enviar").fadeOut();
    });
    
    $(".conta-caracteress").characterCounter();
});