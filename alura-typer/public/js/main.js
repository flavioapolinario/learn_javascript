var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//$(document).ready
$(function() {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
  campo.on("input", function() {
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
  });
}

function inicializaCronometro() {
  var tempoRestante = $("#tempo-digitacao").text();
  campo.one("focus", function() {
    $("#botao-reiniciar").attr("disabled", true);
    var cronometroID = setInterval(function() {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometroID);
        finalizaJogo();
      }
    }, 1000);
  });
}

function finalizaJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-destivado");
  $("#botao-reiniciar").attr("disabled", false);
  inserePlacar();
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();
  campo.toggleClass("campo-destivado");
  campo.removeClass("borda-verde");
  campo.removeClass("borda-vermelha");
}

function inicializaMarcadores() {
  var frase = $(".frase").text();
  campo.on("input", function() {

    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    var ehCorreto = (digitado == comparavel);

    campo.toggleClass("borda-verde", ehCorreto);
    campo.toggleClass("borda-vermelha", !ehCorreto);

    // Com ECMA script 6
    // if (frase.startsWith(digitado)) {
    //   campo.addClass("borda-verde");
    //   campo.removeClass("borda-vermelha");
    // } else {
    //   campo.addClass("borda-vermelha");
    //   campo.removeClass("borda-verde");
    // }

    // Solução 2
    // if (digitado == comparavel) {
    //   campo.addClass("borda-verde");
    //   campo.removeClass("borda-vermelha");
    // } else {
    //   campo.addClass("borda-vermelha");
    //   campo.removeClass("borda-verde");
    // }
  });
}
