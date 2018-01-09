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
        var array = Object.values(data);
        var usuario = array[1];
        var nombre = array[2];
        var apellido = array[3];
        var token = array[8];
        localStorage.setItem("x-auth",token);
        localStorage.setItem("usuario",usuario);
        localStorage.setItem("nombre",nombre);
        localStorage.setItem("apellido",apellido);
        console.log(data);

          alertify.success("Iniciaste Sesion");
        setTimeout('cambiodepagina()',2000);


      },
      error: function(data) {
        if (data.status == 400) {
          alertify.error("Usuario o Contraseña invalida");
        }else if (data.status == 403) {
          alertify.log("Usuario Bloqueado");
        }else if (data.status == 429){
          alertify.log("Excedio el numero de intentos. Este Usuario ha sido bloqueado");
        }else{
          alertify.log("Servicio en mantenimiento. Intente mas tarde");
        }
      },

    });

}


function validarForm(){

  var username = $("#usuario").val();
  var checkUsuario = /([A-Za-z]+[0-9])|([A-Za-z])/;
  var noEspecialesUs = /([A-Za-z]|([0-9]))/;
  $(document).trigger("clear-alert-id.usuario");
  if (username.length < 1) {
    $(document).trigger("set-alert-id-usuario", [
    {
      message: "Debe ingresar un usuario",
      priority: "error"
    }
    ]);
    $('#usuario').val("");
  }else if (!username.match(noEspecialesUs)) {
    $(document).trigger("set-alert-id-usuario", [
    {
      message: "No se aceptan caracteres especiales",
      priority: "error"
    }
    ]);
    $('#usuario').val("");
  }else if(!username.match(checkUsuario)) {
      $(document).trigger("set-alert-id-usuario", [
      {
        message: "Solo se aceptan letras o letras y numeros",
        priority: "error"
      }
      ]);
      $('#usuario').val("");

  }else if (username.length < 3) {
  $(document).trigger("set-alert-id-usuario", [
  {
    message: "Debe ingresar al menos 3 caracteres",
    priority: "error"
  }
  ]);

  }

  <!---------------------------------------------------------------------------------------------------------------->

  var password = $('#password').val();
  var checkPassword = /([A-Za-z]+[0-9])|([A-Za-z])|([0-9])/;
  $(document).trigger("clear-alert-id.password");
  if (password.length < 1) {
    $(document).trigger("set-alert-id-password", [
    {
      message: "Debe ingresar una contraseña",
      priority: "error"
    }
    ]);
    $('#password').val("");
  }else if ((password.length < 7) && (password.match(checkPassword))) {
    $(document).trigger("set-alert-id-password", [
    {
      message: "Debe ingresar al menos 7 caracteres",
      priority: "error"
    }
    ]);
    $('#password').val("");
  }else if ((password.length < 7) && (!password.match(checkPassword))) {
    $(document).trigger("set-alert-id-password", [
    {
      message: "Debe ingresar al menos 7 caracteres. No se aceptan caracteres especiales",
      priority: "error"
    }
    ]);
    $('#password').val("");
  }else{
      var password = $('#password').val();
      if(!password.match(checkPassword)) {
        $(document).trigger("set-alert-id-password", [
        {
          message: "Solo se aceptan letras o numeros",
          priority: "error"
        }
        ]);
        $('#password').val("");
      }
    }

<!---------------------------------------------------------------------------------------------------------------->

}

function cambiodepagina(){
  window.location.href = "notes.html";
}
