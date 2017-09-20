var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//$(document).ready
$(function() {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
  atualizaPlacar();
  $("#usuarios").selectize({create: true, sortField: 'text'});
  fraseAleatoria();
  $("#tamanho-frase").text(0);
  $('.tooltip').tooltipster({
    trigger: "custom"
  });
  buscaUsuario();
});

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(/\S+/).length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
  campo.on("input", function() {
    var conteudo = campo.val();
    //var qtdPalavras = conteudo.split(/\S+/).length - 1;
    var qtdPalavras = contaPalavrasCorretas(conteudo);
    var qtdCaracteres = conteudo.length;
    $("#contador-palavras").text(qtdPalavras);
    $("#contador-caracteres").text(qtdCaracteres);
  });
}

function contaPalavrasCorretas(conteudo){
  var qtdPalavrasCertas = 0;
  var palavras = conteudo.split(/\s+/);
  var frase = $(".frase").text().split(/\s+/);

  $.each(palavras, function(i, palavra){
    $.each(frase, function(j, frasePalavra){
      if(palavra == frasePalavra)
        qtdPalavrasCertas++;
    });
  });

  return qtdPalavrasCertas;
}

function inicializaCronometro() {
  campo.one("focus", function() {
    var tempoRestante = $("#tempo-digitacao").text();
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

  campo.on("input", function() {
    var frase = $(".frase").text();
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
