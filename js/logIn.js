      function SubForm () {
          validarForm();
          var username = $("#usuario").val();
          var password = $("#password").val();
          //Armamos el JSON que vamos a mandar al server
          var data = { "username": username, "password": password};
          //Con stringify nos aseguramos de que se vuelva un JSON valido (Aqui solo lo imprimimos pero en el ajax si lo cambiamos)
          console.log(JSON.stringify(data));
          $.ajax({
            url:'https://doit-api.herokuapp.com/login',
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
                window.location.href = "home.html";
            },
            error: function(data) {
              alert("Nombre de usuario o contraseña invalido")}
            });
      }



      function validateNombreU() {
          var usuario = $('#usuario').val();
          var checkUsuario = /([A-Za-z]+[0-9])|([A-Za-z])/;
          if(!usuario.match(checkUsuario)) {
              alert("Campo Nombre de usuario invalido");
              $('#usuario').val("");
              $('#usuario').focus();
              return false;
          }else{
              return true;
          }
      }

      function validatePassword() {
          var password = $('#password').val();
          var checkPassword = /(([\d]+[A-Za-z]+)|[A-Za-z]+[\d]+$)/;
          if(!password.match(checkPassword)) {
              alert("Ingresar caracteres alfanumerico a la contraseña");
              $('#password').val("");
              $('#password').focus();
              return false;
          }else{
              return true;
          }
      }

      function validarForm(){
          var flag = true;

          if($('#usuario').val()==""){
              alert("Debe ingresar nombre de usuario");
              //$("#nombre").focus();
              flag=false;
          }else if($("#usuario").val()!=""){
              flag = validateNombreU();
          }

          if($('#password').val()==""){
              alert("Debe ingresar la contraseña");
              //$("#apellido").focus();
              flag=false;
          } else if($("#password").val()!=""){
              flag = validatePassword();
          }
          return flag;
      }
