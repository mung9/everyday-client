import React, { Component } from 'react';
import _ from 'lodash';
import TodoList from './common/list';
import DateNav from './common/dateNav';
import TextInputWithButton from './common/textInputWithButton';
import ModifModal from './modifModal';
import * as todoService from '../services/todoService';

import http from '../services/httpService';

import { getYMD } from './common/date';
import config from '../config.json';

class Todo extends Component {
  state = {
    selectedDate: new Date(),
    todos: [],
    titleInput: '',
    isModifAllowed: false,
    todoBeingModif: null,
  }

  async componentDidMount() {
    const { year, month, date } = getYMD(this.state.selectedDate);
    const { data: todos } = await todoService.getTodos(year, month, date);
    this.setState({ todos });
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  }

  handleDelete = async (todo) => {
    const originalTodos = this.state.todos;
    const todos = this.state.todos.filter((o) => o._id !== todo._id);
    this.setState({ todos });

    try {
      await todoService.deleteTodo(todo._id);
    } catch (error) {
      if (error.response && error.response.status === 400)
        alert('The todo has been already deleted.');
      this.setState({ todos: originalTodos });
    }
  }

  handleAddTodo = async () => {
    const { titleInput: title, selectedDate } = this.state;
    if (!title) {
      return;
    }

    let todo = { date: selectedDate, title, };
    const response = await todoService.addTodo(todo);
    todo = response.data;

    const todos = [todo, ...this.state.todos];
    this.setState({ todos, titleInput: '' });
  }

  handleCompletionToggling = async (todo) => {
    const originalTodos = this.state.todos;

    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index] = { ...todo };
    todos[index].isCompleted = !todos[index].isCompleted;
    todos[index].completedDate = null;
    this.setState({ todos });

    try {
      await todoService.updateTodo(todos[index]);
    } catch (error) {
      if (error.response && error.response.status === 400) alert('400 Error!');
      this.setState({ todos: originalTodos });
    }
  }

  handleDateChange = async (date) => {
    if (date.toDateString() === this.state.selectedDate.toDateString()) return;

    const { year, month, date: dateOfTheMonth } = getYMD(date);
    const { data: todos } = await todoService.getTodos(year, month, dateOfTheMonth);
    this.setState({ selectedDate: date, todos });
  }

  handlePrevDate = () => {
    const selectedDate = new Date(this.state.selectedDate);
    selectedDate.setDate(selectedDate.getDate() - 1);
    this.handleDateChange(selectedDate);
  }

  handleNextDate = () => {
    const selectedDate = new Date(this.state.selectedDate);
    selectedDate.setDate(selectedDate.getDate() + 1);
    this.handleDateChange(selectedDate);
  }

  toggleModifModal = (todo) => {
    const isModifAllowed = !this.state.isModifAllowed;
    const todoBeingModif = isModifAllowed ? todo : null;
    this.setState({ isModifAllowed, todoBeingModif });
  }

  handleConfirmModif = async (todo) => {
    const originalTodos = this.state.todos;
    const todos = [...this.state.todos];
    let newTodo = todos.find(t => t._id === todo._id);
    newTodo = { ...todo };
    this.setState({ todos, isModifAllowed: false, todoBeingModif: null });

    try {
      await todoService.updateTodo(newTodo);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500)
        alert(`${error.response.status} Error.`);
      this.setState({ todos: originalTodos });
    }
  }

  renderDate = () => {
    const { selectedDate } = this.state;

  }

  render() {
    const {
      todos,
      titleInput,
      selectedDate,
      isModifAllowed,
      todoBeingModif,
    } = this.state;

    // const sorted = _.orderBy(todos, "date", "desc");

    return (
      <React.Fragment>
        <div className="mt-5 pt-5 col-sm-8 mx-auto">
          {/* <PagingButton onPageLeft={this.handlePrevDate} onPageRight={this.handleNextDate} /> */}
          <DateNav
            date={selectedDate}
            onChange={this.handleDateChange}
            onPrev={this.handlePrevDate}
            onNext={this.handleNextDate}
          />
          <TextInputWithButton
            name="titleInput"
            inputText={titleInput}
            buttonText="Add"
            onChange={this.handleChange}
            onButtonClick={this.handleAddTodo}
            placeholder='Input the todo title you want to add.'
          />
          <TodoList
            onClickItem={this.handleCompletionToggling}
            items={todos}
            onDelete={this.handleDelete}
            onAllowModif={this.toggleModifModal}
          />
        </div>
        <ModifModal
          item={todoBeingModif}
          show={isModifAllowed}
          propertyName='title'
          placeholder="Type the string to be set as the title of the item."
          onClose={this.toggleModifModal}
          onConfirm={this.handleConfirmModif}
        />;
      </React.Fragment>
    );
  }
}

export default Todo;