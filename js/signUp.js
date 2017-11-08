
			function SubForm () {
					validarForm();
					var nombre = $("#nombre").val();
					var apellido = $("#apellido").val();
					var username = $("#usuario").val();
					var dia = $("#day").val();
					var mes = $("#month").val();
					var año = $("#year").val();
					var fechaDeNacimiento = $("#year").val()+"-"+$("#month").val()+"-"+$("#day").val()+"T00:00:00.000Z";
					var password = $("#password").val();
					var formaDeRegistro = 1;
					//Armamos el JSON que vamos a mandar al server
					var data = { "username": username, "nombre": nombre, "apellido": apellido, "fechaDeNacimiento": fechaDeNacimiento, "password": password, "formaDeRegistro": formaDeRegistro};
					//Con stringify nos aseguramos de que se vuelva un JSON valido (Aqui solo lo imprimimos pero en el ajax si lo cambiamos)
					console.log(JSON.stringify(data));
					$.ajax({
						url:'http://doit-api.herokuapp.com/users',
						type:'POST',
						//SUPER IMPORTANTE ESTOS DOS ATRIBUTOS (contentType y dataType)
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						data: JSON.stringify(data),
						//Aqui manejamos el caso si todo va bien y el server responde con un HTTP 2XX
						success:function(data){
							//Este objeto data es la respuesta JSON del servidor, que devuelve el JSON del usuario que se acaba de loggear
								console.log(data);
								alert("Usuario registrado");
								window.location.href = "home.html";
						},
            error: function(data) {
              alert("Algun campo invalido")}
            });
			}


    function validateNombre() {
        var nombre = $('#nombre').val();
        var checkNombre = /^[a-zA-Z_áéíóúñ\s]*$/;
        if(!nombre.match(checkNombre)) {
            alert("Campo Nombre invalido");
            $('#nombre').val("");
            $('#nombre').focus();
            return false;
        }else{
            return true;
        }
    }

    function validateApellido() {
        var apellido = $('#apellido').val();
        var checkApellido =/^[a-zA-Z_áéíóúñ\s]*$/;
        if(!apellido.match(checkApellido)) {
            alert("Campo Apellido invalido");
            $('#apellido').val("");
            $('#apellido').focus();
            return false;
        }else{
            return true;
        }
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
        var checkPassword = /(([\d]+[A-Za-z]+)|[A-Za-z]+[\d]+$)/;;
        if(!password.match(checkPassword)) {
            alert("Ingresar caracteres alfanumerico a la contraseña");
            $('#password').val("");
            $('#password').focus();
            return false;
        }else{
            return true;
        }
    }

    function validatecpassword() {
        var cpassword = $('#cpassword').val();
        var checkcpassword = /(([\d]+[A-Za-z]+)|[A-Za-z]+[\d]+$)/;
        //(([\d]+[A-Za-z]+)|[A-Za-z]+[\d]+$)/;
        if(!cpassword.match(checkcpassword)) {
            alert("Ingresar caracteres alfanumerico a la confirmación de contraseña");
            $('#cpassword').val("");
            $('#cpassword').focus();
            return false;
        }else{
            return true;
        }
    }

    function validateDia() {
        var dia = $('#day').val();
        var checkdia = /([0-9])/;
        if(!dia.match(checkdia)) {
            alert("dia invalido");
            $('#day').val("");
            $('#day').focus();
            return false;
        }else{
            return true;
        }
    }

    function validateMes() {
        var mes = $('#month').val();
        var checkmes = /([0-9])/;
        if(!mes.match(checkmes)) {
            alert("mes invalido");
            $('#month').val("");
            $('#month').focus();
            return false;
        }else{
            return true;
        }
    }

    function validateaño() {
        var year = $('#year').val();
        var checkaño = /([0-9])/;
        if(!year.match(checkaño)) {
            alert("año invalido");
            $('#year').val("");
            $('#year').focus();
            return false;
        }else{
            return true;
        }
    }

    function validarForm(){
        var flag = true;

        if($('#nombre').val()==""){
            alert("Debe ingresar nombre");
            flag=false;
        }else if($("#nombre").val()!=""){
            flag = validateNombre();
        }

        if($('#apellido').val()==""){
            alert("Debe ingresar apellido");
            flag=false;
        } else if($("#apellido").val()!=""){
            flag = validateApellido();
        }

        if($('#usuario').val()==""){
            alert("Debe ingresar nombre de usuario");
          flag=false;
        } else if($("#usuario").val()!=""){
            flag = validateNombreU();
        }

        if($('#day').val()==""){
            alert("Debe ingresar dia");
            flag=false;
        } else if($("#day").val()!=""){
            flag = validateDia();
        }

        if($('#month').val()==""){
            alert("Debe ingresar mes");
            flag=false;
        } else if($("#month").val()!=""){
            flag = validateMes();
        }

        if($('#year').val()==""){
            alert("Debe ingresar año");
            flag=false;
        } else if($("#year").val()!=""){
            flag = validateaño();
        }

        if($('#password').val()==""){
            alert("Debe ingresar contraseña");
            flag=false;
        } else if($("#password").val()!=""){
            flag = validatePassword();
        }
        if($('#cpassword').val()==""){
            alert("Debe confirmar la contraseña");
              flag=false;
        } else if($("#cpassword").val()!=""){
            flag = validatecpassword();
          }

          if ($("#day").val()>"31"){
            alert("Dia invalido");
            $('#day').val("");
            $('#day').focus();
            return false;
          }

          if ($("#month").val()>"12"){
            alert("Mes invalido");
            $('#month').val("");
            $('#month').focus();
            return false;
          }

          if (($("#year").val()>"1999")||($("#year").val()<"1930")){
            alert("Año invalido");
            $('#year').val("");
            $('#year').focus();
            return false;
          }

        if ($("#password").val()!=$("#cpassword").val()){
          alert("Deben coincidir las contraseñas");
          $('#password').val("");
          $('#password').focus();
          $('#cpassword').val("");
          $('#cpassword').focus();
          return false;
        }else {
          return true;
        }
        return flag;

    }
