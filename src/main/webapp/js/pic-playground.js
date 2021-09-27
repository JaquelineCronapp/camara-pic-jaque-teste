document.addEventListener('pic:ready', function () {

    var doc = document;
    var query = "querySelector";
    var iframe = doc[query]("iframe");
    var updateTimeout;
    var UPDATE_DELAY = 800; // milissegundos
    // Seleciona todas as áreas 'pre' que são editáveis
    var area = document.querySelectorAll('pre[contenteditable="true"]');
    var templateVariables;
    var template =
        '<!DOCTYPE html>\n' +
        '<html lang="pt-BR">\n' +
        '    <head>\n' +
        '        <meta charset="utf-8">\n' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        '        <meta name="description" content="{{DESCRICAO}}">\n' +
        '        <meta name="author" content="Diretoria de Inovação e Tecnologia da Informação">\n' +
        '        \n' +
		'        <script charset="utf-8" src="./pic/js/modernizr.js"></script>\n' +
        '        <style>.js body {display: none}</style>\n' +
        '        {{STYLE--EMPTY}}\n' +
        '        <title>{{TITULO_PAGINA}} - {{NOME_SISTEMA}}</title>\n' +
        '    </head>\n' +
        '    <body data-pic-ambiente="{{AMBIENTE}}">\n' +
        '        <!-- wrapper -->\n' +
        '        <div id="wrapper">\n' +
        '            <!-- Header -->\n' +
        '                <div id="banner">\n' +
        '                    <header>\n' +
        '                        <div class="sr-only"><a href="#page-content-wrapper">Ir para o conteúdo.</a> | <a href="#menubar">Ir para a navegação</a>\n' +
        '                        </div>\n' +
        '                        <div id="cabecalho" class="container-fluid">\n' +
        '                            <div class="topoAplicacao">\n' +
        '                                <a class="identAplicacao" href="index.html">\n' +
        '                                    <span class="sigla">{{SIGLA_SISTEMA}}</span>\n' +
        '\n' +
        '                                    <span class="nome">{{NOME_SISTEMA}}</span>\n' +
        '                                </a>\n' +
        '            <!-- PONTO DE INSERÇÃO DAS FERRAMENTAS DE SUPORTE GLOBAL -->\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '            <!-- PONTO DE INSERÇÃO DO MENU GLOBAL -->\n' +
        '{{MENU_GLOBAL--EMPTY}}\n' +
        '\n' +
        '                    </header>\n' +
        '                </div>\n' +
        '\n' +
        '            <!-- PONTO DE INSERÇÃO DO MENU LOCAL -->\n' +
        '{{MENU_LOCAL--EMPTY}}\n' +
        '\n' +
        '            <!-- Área de Conteúdo -->\n' +
        '            <div id="page-content-wrapper">\n' +
        '                <div class="container-fluid">\n' +
        '\n' +
        '            <!-- PONTO DE INSERÇÃO DO CONTEÚDO PRINCIPAL -->\n' +
        '                    <div class="page-header">\n' +
        '                        <h1>{{TITULO_PAGINA}}</h1>\n' +
        '                    </div>\n' +
        '\n' +
        '                    {{CONTEUDO}}\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- Informações de Rodapé -->\n' +
        '            <div class="rodape" role="contentinfo" aria-labelledby="foot-info">\n' +
        '                <div class="dir" id="foot-info">Produzido por <span>Ditec</span></div>\n' +
        '                <div class="esq">\n' +
        '                    <span class="sigla">{{SIGLA_GESTOR}}</span>\n' +
        '                    <span class="divisor"> - </span>\n' +
        '                    <span class="nomeSetor">{{NOME_GESTOR}}</span>\n' +
        '                    <span class="versao">{{VERSAO}}</span>\n' +
        '                </div>\n' +
        '\n' +
        '            </div>\n' +
        '            <!-- /rodapé -->\n' +
        '        </div>\n' +
        '        <!-- /wrapper -->' +
        '        <script src="./pic/js/load-control.js" data-pic-showloading></script>\n' +
        '        {{SCRIPT--EMPTY}}\n' +
        '    </body>\n' +
        '</html>';

    var partialTemplates = [];

    partialTemplates.MENU_GLOBAL =
        '<div id="pic-menu-global">\n' +
        '	<nav class="navbar navbar-default">\n' +
        '		<ul data-pic-globalnav>\n' +
        '			<li>\n' +
        '				<a href="#" class="heading">Grupo de funcionalidades</a>\n' +
        '				<ul>\n' +
        '					<li><a href="#">Uma funcionalidade</a></li>\n' +
        '					<li><a href="#">Outra funcionalidade</a></li>\n' +
        '					<li data-pic-state-current><a href="#">A última funcionalidade</a></li>\n' +
        '				</ul>\n' +
        '			</li>\n' +
        '			<li>\n' +
        '				<a href="#" class="heading">Outro Grupo de Menu</a>\n' +
        '				<ul>\n' +
        '					<li><a href="#">Visão 1 de um objeto</a></li>\n' +
        '					<li><a href="#">Visão 2 de um objeto</a></li>\n' +
        '				</ul>\n' +
        '			</li>\n' +
        '			<li>\n' +
        '				<a href="#">Sem subitens aqui</a>\n' +
        '			</li>\n' +
        '		</ul>\n' +
        '	</nav>\n' +
        '</div>';

    partialTemplates.MENU_LOCAL =
        '<div id="pic-menu-local">\n' +
        '   <nav>\n' +
        '       <ul data-pic-localnav>\n' +
        '           <li><a href="#">Funcionalidade de Primeiro Nível</a></li>\n' +
        '           <li data-pic-state-current><a href="#">Outra Funcionalidade como a Anterior</a></li>\n' +
        '           <li>\n' +
        '               <a href="#">Categoria Hipotética</a>\n' +
        '               <ul>\n' +
        '                   <li><a href="#">Um item</a></li>\n' +
        '                   <li><a href="#">Outro</a></li>\n' +
        '                   <li><a href="#">E mais um da mesma categoria</a></li>\n' +
        '               </ul>\n' +
        '           </li>\n' +
        '           <li>\n' +
        '               <a href="#">Outra Categoria</a>\n' +
        '               <ul>\n' +
        '                   <li><a href="#">Seja consistente</a></li>\n' +
        '                   <li><a href="#">Agrupe adequadamente</a></li>\n' +
        '               </ul>\n' +
        '           </li>\n' +
        '           <li>\n' +
        '               <a href="#">Formas de Levantar as Categorias</a>\n' +
        '               <ul>\n' +
        '                   <li><a href="#">Card Sorting</a></li>\n' +
        '                   <li><a href="#">Focus Groups</a></li>\n' +
        '                   <li><a href="#">Estudo do Negócio</a></li>\n' +
        '               </ul>\n' +
        '           </li>\n' +
        '       </ul>\n' +
        '   </nav>\n' +
        '</div>';


    function parseTemplate(template, variables) {

        $.each(variables, function (key, value) {

            if (!value) {
                // Retorna ao valor "padrão" se value for vazio
                template = template.replace(new RegExp("{{" + key + "}}", "g"), key);
                // Deixa vazio se value for vazio.
                template = template.replace(new RegExp("{{" + key + "--EMPTY}}", "g"), '');
            }
            else {
                // Substitui o placeholder (possuindo ou não o sufixo '--EMPTY') pelo valor informado
                template = template.replace(new RegExp("{{" + key + "(--EMPTY)*}}", "g"), value);
            }
        });

        return template;
    }


    // Retorna true se o parâmetro for um html vazio (string vazia ou apenas com caracteres de "espaço")
    function isEmptyHtml(html) {

        // Verifica se há algum caractere imprimível
        var regex = new RegExp('^(?!\s*$).+', 'gm');
        // Se não houver, retorna true;
        return !regex.test(html);
    }

    function putAreasInTemplate() {

        var style = area[1].innerText,
            script = area[2].innerText;

        style = isEmptyHtml(style) ? '' : '<style>' + style + '</style>\n';
        script = isEmptyHtml(script) ? '' : '<script>' + script + '</script>\n';

        // CONTEUDO, STYLE e SCRIPT têm tratamento diferente porque 
        // não são simples campos de formulário.
        templateVariables.CONTEUDO = area[0].innerText;
        templateVariables.STYLE = style;
        templateVariables.SCRIPT = script;
    }

    function defaultValues() {
        templateVariables = {
            DESCRICAO: 'DESCRICAO',
            TITULO_PAGINA: 'TITULO_PAGINA',
            NOME_SISTEMA: 'NOME_SISTEMA',
            SIGLA_SISTEMA: 'SIGLA_SISTEMA',
            CONTEUDO: 'CONTEUDO',
            SIGLA_GESTOR: 'SIGLA_GESTOR',
            NOME_GESTOR: 'NOME_GESTOR',
            VERSAO: 'VERSAO',
            MENU_GLOBAL: '',
            MENU_LOCAL: ''
        };

        $('#MENU_GLOBAL').prop('checked', false);
        $('#MENU_LOCAL').prop('checked', false);
        $('#MENU_LOCAL').attr('disabled', 'disabled');
        $('#html').text('<p>Seu conteúdo aqui.</p>');
        $('#css').text('/* Em regra, você não vai criar estilos ao usar o PIC. */');
        $('#js').text(`document.addEventListener('pic: ready', function () {
    // Seu código aqui.
});`);

        Prism.highlightElement($('#html')[0]);
        Prism.highlightElement($('#css')[0]);
        Prism.highlightElement($('#js')[0]);
    }

    function initOutput() {

        var parsedTemplate;

        defaultValues();

        putAreasInTemplate();

        parsedTemplate = parseTemplate(template, templateVariables);

        iframe.srcdoc = parsedTemplate;
        $('#outputHtml').text(parsedTemplate);
        Prism.highlightElement($('#outputHtml')[0]);
    }

    function listaModelos() {
        var html = "";
        axios({
            method: 'get',
            url: '/api/modelos', // Alterar para https://ux.camara.leg.br/.... ?
        })
            .then(response => {
                var selectBox = document.getElementById("modelos");
                var dados = response.data;
                
                selectBox.options.length = 0;
                createOption(selectBox, "Selecione...", "");

                dados.forEach(function (item, index) {
                    html += "<option value=" + index + ">" + item.NOME_MODELO + ', por: ' + item.CRIADOR + "</option>"
                });

                function createOption(ddl, text, value) {
                    var opt = document.createElement('option');
                    opt.value = value;
                    opt.text = text;
                    ddl.options.add(opt);
                }

                selectBox.insertAdjacentHTML('beforeend', html);

            })
    }

    // Projetos: salvar e carregar
    $('#salvarProjeto').submit(function (e) {
        e.preventDefault();
        $('#msgAlert').remove();
        axios({
            method: 'post',
            url: '/api/salvar_modelo', // Alterar para https://ux.camara.leg.br/.... ?
            data: {
                NOME_MODELO: document.getElementById('nome_modelo').value,
                SIGLA_SISTEMA: document.getElementById('SIGLA_SISTEMA').value,
                NOME_SISTEMA: document.getElementById('NOME_SISTEMA').value,
                VERSAO: document.getElementById('VERSAO').value,
                TITULO_PAGINA: document.getElementById('TITULO_PAGINA').value,
                DESCRICAO: document.getElementById('DESCRICAO').value,
                SIGLA_GESTOR: document.getElementById('SIGLA_GESTOR').value,
                NOME_GESTOR: document.getElementById('NOME_GESTOR').value,
                AMBIENTE: document.getElementById('AMBIENTE').value,
                MENU_GLOBAL: $("#MENU_GLOBAL").prop('checked') ? $("#MENU_GLOBAL").prop('checked') : false,
                MENU_LOCAL: $("#MENU_LOCAL").prop('checked') ? $("#MENU_LOCAL").prop('checked') : false,
                HTML: document.getElementById('html').textContent,
                CSS: document.getElementById('css').textContent,
                JS: document.getElementById('js').textContent
            }
        })
            .then(response => {
                if (response.data.error === 0) {
                    $('#mensagem-salvamento').append(`<div id="msgAlert" data-pic-alert='{ "type": "success" }'>` + response.data.message +
                        `</div >`);
                    document.getElementById("nome_modelo").value = "";
                    PIC.activateWidget('Alert');
                    $("html, body").animate({ scrollTop: 0 }, 400);
                    listaModelos();
                } else {
                    $('#mensagem-salvamento').append(`<div id="msgAlert" data-pic-alert='{ "type": "error" }'>` + response.data.message +
                        `</div >`);
                    PIC.activateWidget('Alert');
                    $("html, body").animate({ scrollTop: 0 }, 400);
                }

            });
        setTimeout(function () {
            $('#msgAlert').remove();
        }, 10000);
    })

    $('#modelos').on('change', function (modelo) {
        var modeloSelecionado = "";
        axios({
            method: 'get',
            url: '/api/modelos', // Alterar para https://ux.camara.leg.br/.... ?
        })
            .then(response => {
                var dados = response.data;

                dados.forEach(function (item, index) {
                    if (parseInt(modelo.currentTarget.value) === index) {
                        modeloSelecionado = item;
                    }
                });
                
                $('#nome_modelo').val(modeloSelecionado.NOME_MODELO);
                $('#SIGLA_SISTEMA').val(modeloSelecionado.SIGLA_SISTEMA);
                $('#NOME_SISTEMA').val(modeloSelecionado.NOME_SISTEMA);
                $('#VERSAO').val(modeloSelecionado.VERSAO);
                $('#TITULO_PAGINA').val(modeloSelecionado.TITULO_PAGINA);
                $('#DESCRICAO').val(modeloSelecionado.DESCRICAO);
                $('#SIGLA_GESTOR').val(modeloSelecionado.SIGLA_GESTOR);
                $('#NOME_GESTOR').val(modeloSelecionado.NOME_GESTOR);
                $('#AMBIENTE').val(modeloSelecionado.AMBIENTE);
                $('#MENU_GLOBAL').prop('checked', modeloSelecionado.MENU_GLOBAL);
                $('#MENU_LOCAL').prop('checked', modeloSelecionado.MENU_LOCAL);
                $('#html').text(modeloSelecionado.HTML);
                $('#css').text(modeloSelecionado.CSS);
                $('#js').text(modeloSelecionado.JS);

                Prism.highlightElement($('#html')[0]);
                Prism.highlightElement($('#css')[0]);
                Prism.highlightElement($('#js')[0]);

                updateAll(modeloSelecionado);
            })
    });

    function updateFrom(element) {

        var fieldName = element.attr('name');

        // CONTEUDO, STYLE e SCRIPT têm tratamento diferente porque 
        // não são simples campos de formulário.

        if (element[0].type === "checkbox") {
            if (element.is(':checked')) {
                templateVariables[fieldName] = partialTemplates[fieldName];
            }
            else {
                templateVariables[fieldName] = '';
            }
        } else { templateVariables[fieldName] = element.val(); }

        putAreasInTemplate();

        // Aguarda um tempinho antes de pedir para atualizar
        // (para que o usuário possa digitar sem tantas atualizações na página)
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        updateTimeout = setTimeout(function () {

            var parsedTemplate = parseTemplate(template, templateVariables);

            iframe.srcdoc = parsedTemplate;
            $('#outputHtml').text(parsedTemplate);
            Prism.highlightElement($('#outputHtml')[0]);

        }, UPDATE_DELAY);
    }

    function updateAll(modelo) {
        // Atualiza todos os campos das variáveis do template para as que foram carregadas no modelo
        // CONTEUDO, STYLE e SCRIPT têm tratamento diferente porque 
        // não são simples campos de formulário.
        if (modelo) {
            templateVariables = modelo;
            // Varre as variáveis do template afim de encontrar o status do MENU_GLOBAL e MENU_LOCAL e efetuar a inserção do template relacionadas as mesmas
            $('#MENU_LOCAL').attr('disabled', 'disabled');
            Object.keys(templateVariables).forEach(function (item) {
                if (templateVariables[item] === true) {
                    templateVariables[item] = partialTemplates[item];
                    if (item === 'MENU_GLOBAL') {
                        $('#MENU_LOCAL').attr('disabled', false);
                    }
                }

            });

            putAreasInTemplate();

            var parsedTemplate = parseTemplate(template, templateVariables);

            iframe.srcdoc = parsedTemplate;
            $('#outputHtml').text(parsedTemplate);
            Prism.highlightElement($('#outputHtml')[0]);
        } else { initOutput(); }
    }

    // Campos texto
    $('input[type=text]').on('keyup', function (e) {

        updateFrom($(e.target));
    });

    // HTML (CONTEÚDO), SCRIPT e STYLE
    $(area).on('keyup', function (e) {

        updateFrom($(e.target));
    });

    // Campos select
    $('select').not('#modelos').on('change', function (e) {

        updateFrom($(e.target));
    });

    $('input[type=checkbox').on('click', function (e) {
        updateFrom($(e.target));
    });


    /**
     * * Gerenciamento do botão de expandir a view
     * TODO: fazer com que ele abra em nova aba.
     */
    var button = document.querySelector('button#expandir');
    button.addEventListener('click', fullscreen);
    // quando você estiver em fullscreen, ESC e F11 não será acionado pelo eventlistener 
    // então não utilize para capturar a saida do fullscreen.
    // document.addEventListener('keydown', function (e) {
    //     console.log('key press' + e.keyCode);
    // });
    // detecta se você entrou ou saiu do modo fullscreen
    document.addEventListener('webkitfullscreenchange', fullscreenChange);
    document.addEventListener('mozfullscreenchange', fullscreenChange);
    document.addEventListener('fullscreenchange', fullscreenChange);
    document.addEventListener('MSFullscreenChange', fullscreenChange);

    function fullscreen() {
        // verifica se o modo fullscreen está disponível
        if (document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled) {

            // se o elemento pode se tornar fullscreen
            var iframe = document.querySelector('#iframeCodePreview');
            // transforma em fullscreen
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
            }
        }
        else {
            document.querySelector('.error').innerHTML = 'Seu navegador não é suportado.';
        }
    }

    function fullscreenChange() {
        if (document.fullscreenEnabled ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            document.msFullscreenElement) {
        }
        // força o recarregamento do iframe uma vez para evitar que a fonte do iframe não se importe em tentar redimensionar a janela
        // comente essa linha e você verá
        var iframe = document.querySelector('iframe');
        iframe.src = iframe.src;
    }

    // Gerenciando dependência entre menu global e local (o segundo não pode existir antes do primeiro)
    $('#MENU_GLOBAL').on('click', function (e) {
        if ($('#MENU_GLOBAL').is(':checked')) {
            $("#MENU_LOCAL").removeAttr('disabled');
        }
        else {
            $("#MENU_LOCAL").attr('disabled', 'disabled');
            $("#MENU_LOCAL").prop('checked', false);
            updateFrom($("#MENU_LOCAL"));
        }
    });

    initOutput();
    listaModelos();
}, false);

