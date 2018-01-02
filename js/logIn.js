function SubForm () {
  validarForm();
  var username = $("#usuario").val();
  var password = $("#password").val();
  //Armamos el JSON que vamos a mandar al server
  var data = { "username": username, "password": password};
  //Con stringify nos aseguramos de que se vuelva un JSON valido (Aqui solo lo imprimimos pero en el ajax si lo cambiamos)
  console.log(JSON.stringify(data));
    $.ajax({
      url:'https://api-doit.herokuapp.com/login',
      type:'post',
      //SUPER IMPORTANTE ESTOS DOS ATRIBUTOS (contentType y dataType)
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data),
      //Aqui manejamos el caso si todo va bien y el server responde con un HTTP 2XX
      success:function(data){
        //Este objeto data es la respuesta JSON del servidor, que devuelve el JSON del usuario que se acaba de loggear
        console.log(data);
        alert("Iniciaste sesión");
        window.location.href = "notes.html";
      },
      error: function(data) {
        if (data.status == 400) {
          alert("Usuario o Contraseña invalida");
        }
      }
    });
}

function validarForm(){

  //arreglar

}
