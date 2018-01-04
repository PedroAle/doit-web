// Simple TodoApp en angular 1.x
var app = angular.module('todoApp', []);

app.controller('TodoController', function ($scope) {
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
   
  $scope.todos = [
    {title: 'Titulo de la tarea' , description: 'Descripción de la tarea... PRUEBA AHORA!!!', date: "Fecha de la tarea", category: 'Urgente'},
  ];

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
