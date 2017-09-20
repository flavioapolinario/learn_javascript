$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = $("#usuarios").val();
  var numPalavras = $("#contador-palavras").text();
  var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";

  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);
  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);
}

function scrollPlacar() {
  var posicaoPlacar = $(".placar").offset().top;
  $("body").animate({
    scrollTop: posicaoPlacar + "px"
  }, 500);
}

function novaLinha(usuario, numPalavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(numPalavras);
  var colunaRemover = $("<td>");
  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("small material-icons").text("delete");

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha() {
  event.preventDefault();
  //$(this).parent().parent().remove();
  var linha = $(this).parent().parent();
  // linha.fadeOut(1000); // fadeIn, fadetoggle
  // setTimeout(function() {
  //   linha.remove();
  // }, 1000);

  linha.fadeOut("slow", function() {
    linha.remove();
  });
}

function mostraPlacar() {
  //$(".placar").toggle();
  //$(".placar").slideDown(1000);
  // .stop(): permite que seja executada o ultimo evento(imediatamente)
  //          evitando repetição do evento slideToggle
  $(".placar").stop().slideToggle(1000);
}

function sincronizaPlacar() {
  var placar = [];
  var linhas = $("tbody>tr");

  linhas.each(function() {
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();
    var score = {
      usuario: usuario,
      pontos: palavras
    };
    placar.push(score);
  });

  var dados = {
    placar: placar
  };

  $.post("http://localhost:3000/placar", dados, function() {
    $('.tooltip').tooltipster("open").tooltipster("content","Sincronizado com sucesso!");
  }).fail(function() {
    $('.tooltip').tooltipster("open").tooltipster("content","Falha ao sincronizar!");
  }).always(function() {
    setTimeout(function() {
      $('.tooltip').tooltipster("close");
    }, 1200);
  });

}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function(data) {
    $(data).each(function() {
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    });
  });
}
