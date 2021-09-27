var tamanhoMinimo = function (value) {
    var result = value.length >= 10;
    return result;
};

$("#form1").picValidation().setRule("minhaRegra", tamanhoMinimo, "O texto informado tem menos de 10 caracteres");
