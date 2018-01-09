function logO(){

  var token = localStorage.getItem("x-auth");
  $.ajax({
    url:'https://api-doit.herokuapp.com/logout',
    type:'delete',
    headers: {"x-auth":token},
    //Aqui manejamos el caso si todo va bien y el server responde con un HTTP 2XX
    success:function(response){
      localStorage.removeItem("usuario");
      localStorage.removeItem("nombre");
      localStorage.removeItem("apellido");
      localStorage.removeItem("x-auth");
      window.location.href = "home.html";
    },
    error: function(response) {}
  });

}
