$('body').prepend(`
<!-- Adicionado o Cabeçalho da Camara -->
<header>
    <div class="sr-only">
        <a href="#page-content-wrapper">Ir para o conteúdo.</a> |
        <a href="#menubar">Ir para a navegação</a>
    </div>
    <div id="cabecalho" class="container-fluid">
        <div class="topoAplicacao">
            <a class="identAplicacao" href="index.html"> <span class="sigla">Sistema</span> <span class="nome">Descrição do Sistema</span> </a>
        </div>
    </div>
</header>
<!-- END - Adicionado o Cabeçalho da Camara -->
`);

$('head').append(`
<script src="pic/js/prism/prism.js"></script>
<script src="pic/js/prism/prism-highlight.js"></script>
`);

$('head').prepend(`
<link rel="stylesheet" href="pic/js/prism/prism.css">
<link rel="stylesheet" href="pic/css/tema_basico.css">
<link rel="stylesheet" href="pic/css/pic.allcustoms.css">
<link rel="stylesheet" href="pic/css/pic.allplugins.css"> 
`);

$('head').append(`<script src="pic/js/modernizr.js"></script>`);