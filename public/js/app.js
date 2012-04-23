Todos = Ember.Application.create();

/*
Todos.Todo = Em.Object.extend({
  title: null,
  isDone: false
});
*/

Todos.Todo = Ember.Resource.extend({
    resourceUrl: 'http://localhost:8080/api/v1/todos',
    resourceName: 'todo',
    resourceProperties: ['title','isDone'],

    _prepareResourceRequest: function(params) {
      console.log(params);
      params.url=params.url+'?callback=?&_method='+params.type;
    }

});

Todos.todosController = Ember.ResourceController.create({
    resourceType: Todos.Todo,
    content: [],

    _prepareResourceRequest: function(params) {
      console.log(params);
      params.url=params.url+'?callback=?';
    },

  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });
    this.pushObject(todo);
    todo.saveResource();    
  },

  clearCompletedTodos: function() {
      var deleteset = this.filterProperty('isDone', true);
      for(var i=0;i<deleteset.length;i++) {
        var rec=deleteset[i];
        rec.destroyResource();
        this.removeObject(rec);
      }
      //deleteset.forEach(console.log, this);
      //console.log(deleteset);
      //deleteset.forEach(this.destroyResource, this);
      //deleteset.forEach(this.removeObject, this);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);

      return value;
    } else {
      return !!this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
});

Todos.StatsView = Em.View.extend({
  remainingBinding: 'Todos.todosController.remaining',

  remainingString: function() {
    var remaining = this.get('remaining');
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining')
});

Todos.CreateTodoView = Em.TextField.extend({
    insertNewline: function() {
      var value = this.get('value');
      if (value) {
        Todos.todosController.createTodo(value);
        this.set('value', '');
      }
    }
});

// lets write some loader out here
$(function() {
    Todos.todosController.findAll();
  });

