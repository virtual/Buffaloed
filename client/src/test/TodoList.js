import React, { Component } from 'react';
import Todo from './Todo'
 
class TodoList extends Component {
  constructor() {
    super();
    this.todos = [];
  }
 
  addTodo(todo) {
    this.setState({todos: this.todos.concat(todo)});
  }
 
  render() {
    return (
      <div className="App">
        <p>Our Todo List</p>
        {this.todos.map(todo => <Todo todo={todo}/>)}
      </div>
    );
  }
}
 
export default TodoList;