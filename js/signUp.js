
function SubForm () {
	validarForm();
	var nombre = $("#nombre").val();
	var apellido = $("#apellido").val();
	var username = $("#usuario").val();
	var date = $("#date").val();
	var arr = date.split("/");
	var fechaDeNacimiento = (arr[2]+"-"+arr[1]+"-"+arr[0]+"T00:00:00.000Z");
	var password = $("#password").val();
	var formaDeRegistro = 1;
	//Armamos el JSON que vamos a mandar al server
	var data = { "username": username, "nombre": nombre, "apellido": apellido, "fechaDeNacimiento": fechaDeNacimiento, "password": password, "formaDeRegistro": formaDeRegistro};
	//Con stringify nos aseguramos de que se vuelva un JSON valido (Aqui solo lo imprimimos pero en el ajax si lo cambiamos)
	console.log(JSON.stringify(data));
	$.ajax({
		url:'https://api-doit.herokuapp.com/users/register',
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
			if (data.status == 400) {
	          alert("No se pudo registrar el usuario");
	        }
		}
    });
}

function validarForm(){

	var nombre = $("#nombre").val();
	var noNumerosNm = /[0-9]/;
	var checknombre =/^[a-zA-Z_áéíóúñ\s]*$/;
	$(document).trigger("clear-alert-id.nombre");
	if (nombre.length < 1) {
		$(document).trigger("set-alert-id-nombre", [
			{
				message: "Debe ingresar un nombre",
				priority: "error"
			}
		]);
		$('#nombre').val("");
		}else if ((nombre.length < 3) && (nombre.match(checknombre))) {
			$(document).trigger("set-alert-id-nombre", [
				{
					message: "Debe ingresar al menos 3 caracteres",
					priority: "error"
				}
			]);
			$('#nombre').val("");
			}else if ((nombre.length < 3) && (!nombre.match(noNumerosNm))) {
				$(document).trigger("set-alert-id-nombre", [
					{
						message: "Debe ingresar al menos 3 caracteres. No se aceptan caracteres especiales",
						priority: "error"
					}
				]);
				$('#nombre').val("");
			}else if ((nombre.length < 3) && ((!nombre.match(checknombre)) || (!nombre.match(noNumerosNm)))) {
				$(document).trigger("set-alert-id-nombre", [
					{
						message: "Debe ingresar al menos 3 caracteres. No se aceptan numeros",
						priority: "error"
					}
				]);
				$('#nombre').val("");
			}else{
				if(!nombre.match(checknombre)) {
					$(document).trigger("set-alert-id-nombre", [
						{
							message: "Solo se aceptan letras",
							priority: "error"
						}
					]);
					$('#nombre').val("");
				}
			}
<!---------------------------------------------------------------------------------------------------------------->

	var apellido = $("#apellido").val();
	var noNumerosAp = /[0-9]/;
	var checkApellido =/^[a-zA-Z_áéíóúñ\s]*$/;
	$(document).trigger("clear-alert-id.apellido");
	    if (apellido.length < 1) {
		    $(document).trigger("set-alert-id-apellido", [
    		   {
		          message: "Debe ingresar un apellido",
		          priority: "error"
		        }
		    ]);
			$('#apellido').val("");
			}else if ((apellido.length < 3) && (apellido.match(checkApellido))) {
		      	$(document).trigger("set-alert-id-apellido", [
		        	{
		          		message: "Debe ingresar al menos 3 caracteres",
		          		priority: "error"
		        	}
		      	]);
				$('#apellido').val("");
		    }else if ((apellido.length < 3) && (!apellido.match(noNumerosAp))) {
		      	$(document).trigger("set-alert-id-apellido", [
		        	{
		          		message: "Debe ingresar al menos 3 caracteres. No se aceptan caracteres especiales",
		          		priority: "error"
		        		}
		      	]);
				$('#apellido').val("");
			}else if ((apellido.length < 3) && ((!apellido.match(checkApellido)) || (!apellido.match(noNumerosAp)))) {
		    	$(document).trigger("set-alert-id-apellido", [
		      		{
		       			message: "Debe ingresar al menos 3 caracteres. No se aceptan numeros",
		       			priority: "error"
		       		}
		    	]);
					$('#apellido').val("");
			}else{
		    	if(!apellido.match(checkApellido)) {
					$(document).trigger("set-alert-id-apellido", [
			        	{
			          		message: "Solo se aceptan letras",
			          		priority: "error"
			        	}
			      	]);
					$('#apellido').val("");
				}
		    }

<!---------------------------------------------------------------------------------------------------------------->

	var username = $("#usuario").val();
	var checkUsuario = /([A-Za-z]+[0-9])|([A-Za-z])/;
	var noEspecialesUs = /([A-Za-z]|([0-9]))/
	$(document).trigger("clear-alert-id.usuario");
		if (username.length < 1) {
			$(document).trigger("set-alert-id-usuario", [
				{
					message: "Debe ingresar un usuario",
					priority: "error"
				}
			]);
			$('#usuario').val("");
		}else if ((username.length < 6) && (!username.match(noEspecialesUs))) {
			$(document).trigger("set-alert-id-usuario", [
				{
					message: "Debe ingresar al menos 6 caracteres. No se aceptan caracteres especiales",
					priority: "error"
				}
			]);
			$('#usuario').val("");
		}else if (username.length < 6) {
			$(document).trigger("set-alert-id-usuario", [
				{
					message: "Debe ingresar al menos 6 caracteres",
					priority: "error"
				}
			]);
		}else{
			if(!username.match(checkUsuario)) {
				$(document).trigger("set-alert-id-usuario", [
				    {
					    message: "Solo se aceptan letras o letras y numeros",
					    priority: "error"
				  	}
			    ]);
				$('#usuario').val("");
			}
		}

<!---------------------------------------------------------------------------------------------------------------->

	var date = $("#date").val();
	$(document).trigger("clear-alert-id.fecha");
		if (date.length < 10) {
			$(document).trigger("set-alert-id-fecha", [
				{
					message: "Debe ingresar una fecha",
					priority: "error"
				}
			]);
		}else {
			var date = $("#date").val();
			var arr = date.split("/");
			if (arr[2]>1998){
				$(document).trigger("set-alert-id-fecha", [
				    {
						message: "A;o incorrecto",
				      	priority: "error"
				    }
				]);
			}
			if(arr[1]>12){
				$(document).trigger("set-alert-id-fecha", [
				    {
				      	message: "Mes incorrecto",
				      	priority: "error"
				    }
				]);
			}
			if(arr[0]>31){
				$(document).trigger("set-alert-id-fecha", [
				    {
		     		    message: "Dia incorrecto",
				      	priority: "error"
				    }
				]);
			}
			$('#date').val("");
		}

<!---------------------------------------------------------------------------------------------------------------->

	var password = $('#password').val();
	var checkPassword = /([A-Za-z]+[0-9])|([A-Za-z])|([0-9])/;
	$(document).trigger("clear-alert-id.password");
		if (password.length < 1) {
			$(document).trigger("set-alert-id-password", [
				{
					message: "Debe ingresar una contrase;a",
					priority: "error"
				}
			]);
			$('#password').val("");
		}else if ((password.length < 8) && (password.match(checkPassword))) {
			$(document).trigger("set-alert-id-password", [
				{
					message: "Debe ingresar al menos 8 caracteres",
					priority: "error"
				}
			]);
			$('#password').val("");
		}else if ((password.length < 8) && (!password.match(checkPassword))) {
			$(document).trigger("set-alert-id-password", [
				{
					message: "Debe ingresar al menos 8 caracteres. No se aceptan caracteres especiales",
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

	var cpassword = $('#cpassword').val();
	var checkcPassword = /([A-Za-z]+[0-9])|([A-Za-z])|([0-9])/;
	$(document).trigger("clear-alert-id.cpassword");
		if (password.length < 1) {
			$(document).trigger("set-alert-id-cpassword", [
				{
					message: "Debe ingresar una contrase;a",
					priority: "error"
				}
			]);
			$('#cpassword').val("");
		}else if ((password.length < 8) && (password.match(checkcPassword))){
			$(document).trigger("set-alert-id-cpassword", [
				{
					message: "Debe ingresar al menos 8 caracteres",
					priority: "error"
				}
			]);
			$('#cpassword').val("");
		}else if ((password.length < 8) && (!password.match(checkcPassword))){
			$(document).trigger("set-alert-id-cpassword", [
				{
					message: "Debe ingresar al menos 8 caracteres. No se aceptan caracteres especiales",
					priority: "error"
				}
			]);
			$('#cpassword').val("");
		}else{
			var cpassword = $('#cpassword').val();
		    if(!cpassword.match(checkcPassword)) {
				$(document).trigger("set-alert-id-cpassword", [
					{
						message: "Solo se aceptan letras o numeros",
						priority: "error"
					}
				]);
				$('#cpassword').val("");
			}
		}

		if ($("#password").val()!=$("#cpassword").val()){
			$(document).trigger("set-alert-id-cpassword", [
				{
					message: "No coinciden ambas contrase;as",
					priority: "error"
				}
			]);
	        $('#password').val("");
	        $('#cpassword').val("");
	    }
}
