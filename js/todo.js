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

  $http({
    url:"https://api-doit.herokuapp.com/tasks/me",
    method: "GET",
    headers: {"x-auth":token}
  }).then(function successCallback(response) {
    var arrayTasks = Object.values(response.data.tasks);
    var i = 0;
    while(arrayTasks[i]){
      var arrayTask = arrayTasks[i];
      var arrayTaskValues = Object.values(arrayTask);
      var taskNombre = arrayTaskValues[2];
      var taskDescripcion = arrayTaskValues[3];
      var taskCategoria = arrayTaskValues[4];
      var taskFecha = arrayTaskValues[5];

      var urgente = localStorage.getItem("urgenteID");
      var importante = localStorage.getItem("importanteID");
      var regular = localStorage.getItem("regularID");

      if(taskCategoria == regular){
        taskCategoria = "Regular";
      }else if (taskCategoria == importante){
        taskCategoria = "Importante";
      }else {
        taskCategoria = "Urgente";
      }

      if(taskFecha == "0"){
        $scope.todos.push({title: taskNombre , description: taskDescripcion, date: "", category: taskCategoria});
      }else{
        $scope.todos.push({title: taskNombre , description: taskDescripcion, date: taskFecha, category: taskCategoria});
      }
      i = i +1;
    }

    var todos = $scope.todos;
    var arrayTodos = Object.values(todos);
    console.log(arrayTodos);
    localStorage.setItem("arrayTodos", arrayTodos);


  }, function errorCallback(response) {
  });

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
    var arrayTodo = Object.values(todo);
    var todoNombre = arrayTodo[0];
    var todoDescripcion = arrayTodo[1];
    var todoFecha = arrayTodo[2];
    var todoCategoria = arrayTodo[3];

    localStorage.setItem("todoNombre", todoNombre);
    localStorage.setItem("todoDescripcion", todoDescripcion);
    localStorage.setItem("todoFecha", todoFecha);
    localStorage.setItem("todoCategoria", todoCategoria);

    $http({
      url:"https://api-doit.herokuapp.com/tasks/me",
      method: "GET",
      headers: {"x-auth":token}
    }).then(function successCallback(response) {
      var arrayTasks = Object.values(response.data.tasks);
      var i = 0;
      var j = 0;

      while((arrayTasks[i])&&(j==0)){
        var arrayTask = arrayTasks[i];
        var arrayTaskValues = Object.values(arrayTask);
        var taskID = arrayTaskValues[0];
        var taskNombre = arrayTaskValues[2];
        var taskDescripcion = arrayTaskValues[3];
        var taskCategoria = arrayTaskValues[4];
        var taskFecha = arrayTaskValues[5];

        var urgente = localStorage.getItem("urgenteID");
        var importante = localStorage.getItem("importanteID");
        var regular = localStorage.getItem("regularID");

        var todoNombre =  localStorage.getItem("todoNombre");
        var todoDescripcion =  localStorage.getItem("todoDescripcion");
        var todoFecha =  localStorage.getItem("todoFecha");
        var todoCategoria =  localStorage.getItem("todoCategoria");

        if(taskCategoria == regular){
          taskCategoria = "Regular";
        }else if (taskCategoria == importante){
          taskCategoria = "Importante";
        }else {
          taskCategoria = "Urgente";
        }

        if ((taskNombre == todoNombre)&&(taskDescripcion == todoDescripcion)&&(taskFecha == todoFecha)&&(taskCategoria == todoCategoria)){
          j = 1;
          localStorage.setItem("taskID",taskID);
        }else {
          j = 0;
        }
        i = i +1;
      }
    }, function errorCallback(response) {
    });

    if (index !== -1) {
      todos.splice(index, 1);
      $http({
        url:"https://api-doit.herokuapp.com/tasks/"+localStorage.getItem("taskID"),
        method: "DELETE",
        headers: {"x-auth":token}
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
      });

    }
  }

});

