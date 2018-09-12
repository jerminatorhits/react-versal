import React, { Component } from 'react';
import './App.css';

class TodoApp extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      isEditMode: false,
      editItemIndex: null,
      todos: [],
      showAll: false
    };
  };

  handleInputChange = event => {
    this.setState({
      input: event.target.value
    })
  }

  handleInputClick = () => {
    const {
      editItemIndex,
      input,
      isEditMode,
      todos
    } = this.state;
    if (isEditMode && editItemIndex >= 0) { // edit item via index
      todos[editItemIndex].name = input;
      todos.forEach(todo => todo.isEditing = false);
      this.setState({
        input: '',
        isEditMode: false,
        editItemIndex: null,
        todos,
      });
    }
    else {  // Create new todo item
      const newTodo = {
        name: this.refs.addTodoInput.value,
        isCompleted: false,
        isEditing: false,
      };
      todos.push(newTodo);
      this.setState({ todos });
    }
  };

  handleClick = (e, index) => { // set item to be editted
    const { todos } = this.state;
    todos.forEach(todo => todo.isEditing = false);
    todos[index].isEditing = true;
    this.setState({
      input: todos[index].name,
      isEditMode: true,
      editItemIndex: index,
      todos,
    });
  }

  handleDoubleClick = (e, index) => {
    const { todos } = this.state;
    todos[index].isCompleted = true;
    todos[index].isEditing = false;
    this.setState({
      isEditMode: false,
      editItemIndex: null,
      todos,
    });
  };

  handleToggleView = () => {
    this.setState({
      showAll: !this.state.showAll
    });
  }

  render() {
    const { isEditMode, showAll } = this.state;
    return (
      <div className="todo-container">
        <h2>You have {this.state.todos.length} items on the agenda.</h2>

        <div className="todos">
          {this.state.todos.map((todo, i) => {
            if (!showAll) { // show uncompleted tasks only
              return (
                !todo.isCompleted && <li
                  className="todo"
                  key={i}
                  onClick={event => this.handleClick(event, i)}
                  onDoubleClick={event => this.handleDoubleClick(event, i)}>
                  {todo.name}
                  {todo.isCompleted && <span className="completed-status">Completed</span>}
                  {todo.isEditing && <span className="editing-status">Currently Editing...</span>}
                </li>
              )
            }
            
            return (
              <li
                className="todo"
                key={i}
                onClick={event => this.handleClick(event, i)}
                onDoubleClick={event => this.handleDoubleClick(event, i)}>
                {todo.name}
                {todo.isCompleted && <span className="completed-status">Completed</span>}
                {todo.isEditing && <span className="editing-status">Currently Editing...</span>}
              </li>
            );
          })}
        </div>

        <div className="add">
          <input type="text" value={this.state.input} onChange={this.handleInputChange} ref="addTodoInput" />
          <button onClick={this.handleInputClick}>{isEditMode ? 'Save' : 'Add'}</button>
          <button onClick={this.handleToggleView}>{showAll ? 'View Current Tasks' : 'View All Tasks'}</button>
        </div>
      </div>
    );
  };
};

export default TodoApp;
