function buscaUsuario() {
  $.get("http://localhost:3000/placar", function(data) {
    var selectize_element = $("#usuarios")[0].selectize;
    $(data).each(function(i, item) {
       selectize_element.addOption({
          text: item.usuario,
          value: item.usuario
      });
      selectize_element.addItem(item.usuario);
    });
  }).fail(function(){
    $("#erro").text("Falha ao buscar usuarios");
    $("#erro").toggle();

    setTimeout(function() {
      $("#erro").toggle();
    }, 2000);

  }).always(function(){

  });

}
