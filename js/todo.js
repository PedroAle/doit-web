var app = angular.module('todoApp', []);

app.controller('TodoController', function ($scope, $http) {

  $scope.input = '';
  $scope.input1 = '';
  $scope.date = '';
  $scope.editing = null;
  $scope.Category = [{
                Id: 'Regular',
                Name: 'Regular'
            }, {
                Id: 'Importante',
                Name: 'Importante'
            }, {
                Id: 'Urgente',
                Name: 'Urgente'
            }];


  var token =localStorage.getItem("x-auth"); //TODO: X-AUTH

  $scope.todos = [  ];



  $scope.add = add;
  $scope.remove = remove;

  function add(input,input1,date,Category) {
    $(document).trigger("clear-alert-id.titulo");
    if (input.length < 1){
      $(document).trigger("set-alert-id-titulo", [
            {
              message: "Ingrese Titulo",
              priority: "error"
            }
          ]);
      return
    }
    if(!Category){
      Category = "Regular";
    }
    $scope.todos.push({title: input , description: input1 , date: date , category: Category} );

    var token =localStorage.getItem("x-auth"); //TODO: X-AUTH
    //alert(token);

    $http.get("https://api-doit.herokuapp.com/categories")
    .then(function(response) {
        var array = Object.values(response.data.categories);
        var arrayUrgente = array[0];
        var arrayUrgenteValues = Object.values(arrayUrgente);
        var urgenteID = arrayUrgenteValues[0];
        localStorage.setItem("urgenteID", urgenteID);

        var arrayImportante = array[1];
        var arrayImportanteValues = Object.values(arrayImportante);
        var importanteID = arrayImportanteValues[0];
        localStorage.setItem("importanteID", importanteID);

        var arrayRegular = array[2];
        var arrayRegularValues = Object.values(arrayRegular);
        var regularID = arrayRegularValues[0];
        localStorage.setItem("regularID", regularID);

    });

    var urgente = localStorage.getItem("urgenteID");
    var importante = localStorage.getItem("importanteID");
    var regular = localStorage.getItem("regularID");

    if(Category == "Regular"){
      CategoryID = regular;
    }else if (Category == "Importante"){
      CategoryID = importante;
    }else {
      CategoryID = urgente;
    }

    if (date == ""){
      var data = {"nombre" : input, "descripcion" : input1, "category" : CategoryID};
    }else{
      var data = {"nombre" : input, "descripcion" : input1, "fechaParaCompletar" : date, "category" : CategoryID};
    }
    console.log(JSON.stringify(data));

    $http({
      url:"https://api-doit.herokuapp.com/tasks",
      method: "POST",

      headers: {"x-auth":token},
      data: (JSON.stringify(data))
    }).then(function successCallback(response) {
    }, function errorCallback(response) {
      if(response.status == 401){
        alert("El token no es valido");
      }
    });

    $scope.input = '';
    $scope.input1 = '';
    $scope.input2 = null;
    $scope.Category = [{
                Id: 'Regular',
                Name: 'Regular'
            }, {
                Id: 'Importante',
                Name: 'Importante'
            }, {
                Id: 'Urgente',
                Name: 'Urgente'
            }];
  }

  function remove(todo) {
    var todos = $scope.todos;
    var index = todos.indexOf(todo);
    if (index !== -1) {
      todos.splice(index, 1);
     }
  }
});