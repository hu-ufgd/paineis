/* global TabelaAjax */

TabelaAjax = {
    $tabela: null,
    $template: null,
    $url: null,
    initIndex: function (url, tabela, template, pagina = 1, searchId = "search") {
        TabelaAjax.$tabela = tabela;
        TabelaAjax.$template = template;
        TabelaAjax.$url = url;
        TabelaAjax.loadPagina(pagina, "");

        $(window).on('scroll', function () {
            $proximaPagina = window.sessionStorage.getItem("paginas." + TabelaAjax.$tabela + ".pagina");
            $busca = $("#" + searchId).val();
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                TabelaAjax.loadPagina($proximaPagina, $busca);
            }
        });
        $("#" + searchId).on('keyup', function () {
            try {
                window.clearTimeout(timeOutBusca)
            } catch (e) {
                //nada a fazer aqui
            }
            timeOutBusca = window.setTimeout(function () {
                $busca = $("#" + searchId).val();
//              primeira pagina dessa busca
                TabelaAjax.loadPagina(1, $busca);
            }, 400);
        });

    },
    getPagina: function ($pagina, $busca) {
        //pega da sessionStorage
        var $dados = JSON.parse(sessionStorage.getItem("pagina" + TabelaAjax.$tabela));
        var $proximaPagina = parseInt(sessionStorage.getItem("paginas." + TabelaAjax.$tabela + ".pagina")) + 1;
        //e já apaga
        sessionStorage.removeItem("pagina" + TabelaAjax.$tabela);
        //e já registra a próxima
        if ($dados === null) {
            $urlCompleta = TabelaAjax.$url.replace(/:pagina/g, $pagina).replace(/:busca/g, $busca);
            $.ajax($urlCompleta, {
                async: false,
                dataType: "json"
            }).done(function (retorno) {
                $dados = retorno;
                sessionStorage.setItem("paginas." + TabelaAjax.$tabela + ".pagina", $proximaPagina);
            }) //done
                    ;
        } // if
        else {
            console.log("Buscando da sessionStorage: " + "pagina" + TabelaAjax.$tabela);
        }
        return $dados;
    }, //getPagina
    get: function ($busca) {
        $urlCompleta = TabelaAjax.$url.replace(/:busca/g, $busca);
        $dados = false;
        $.ajax($urlCompleta, {
            async: false,
            dataType: "json"
        }).done(function (retorno) {
            $dados = retorno;
        }); //done
        return $dados;
    }, //get
    loadPagina: function ($pagina, $busca) {
        if ($pagina === 1) {
            //se for primeira página, limpa a tabela
            $(TabelaAjax.$tabela).find("tbody").empty();
            $("#totalizador").text("0 de 0 registros").fadeIn();
        }
        var retorno = TabelaAjax.getPagina($pagina, $busca);
        if (retorno === null)
            return;
        var linhas = retorno.linhas;
        var linhasExibidas = $(TabelaAjax.$tabela).find("tbody tr").length;
        if (retorno.totalFiltro === 0 && linhasExibidas === 0) {

        } else if (retorno.linhas !== null) {
            var linhasTabela = $(TabelaAjax.$template).render(linhas);
            $(TabelaAjax.$tabela).find("tbody").append(linhasTabela);
            linhasExibidas = $(TabelaAjax.$tabela).find("tbody tr").length;
            var texto = linhasExibidas + " de " + retorno.totalFiltro + " registros";
            if (parseInt(retorno.totalFiltro) < parseInt(retorno.totalTabela)) {
                texto += " (filtrados de " + retorno.totalTabela + " existentes)";
            } // if
            $("#totalizador").text(texto).show();
            $pagina = 1 * $pagina + 1;
            window.sessionStorage.setItem("paginas." + TabelaAjax.$tabela + ".pagina", $pagina);
            $(".tooltiped").tooltip();
        } // if (retorno.linhas !== null)
    }//loadPagina
    , getDados: function ($busca) {
        $(TabelaAjax.$tabela).find("tbody").empty();
        var linhas = TabelaAjax.get($busca);
        if (linhas === null) {
            console.log('Busca por: "', $busca, '" não trouxe resultados');
            return;
        }
        var linhasTabela = $(TabelaAjax.$template).render(linhas);
        $(TabelaAjax.$tabela).find("tbody").append(linhasTabela);
        $(".tooltiped").tooltip();
    }
    , setLoadData: function (url, tabela, template, searchId = "search") {
        TabelaAjax.$tabela = tabela;
        TabelaAjax.$template = template;
        TabelaAjax.$url = url;

        $busca = $("#" + searchId).val();
        //TabelaAjax.load($busca);

        $("#" + searchId).on('keyup', function () {
            try {
                window.clearTimeout(timeOutBusca)
            } catch (e) {
                //nada a fazer aqui
            }
            timeOutBusca = window.setTimeout(function () {
                $busca = $("#" + searchId).val();
                TabelaAjax.getDados($busca);
            }, 400);
        });
    }//init
}