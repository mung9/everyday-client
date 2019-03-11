import React, { Component } from 'react';
import _ from 'lodash';
import PagingButton from './common/pagingButton';
import List from './common/list';
import DateNav from './common/dateNav';
import TextInputWithButton from './common/textInputWithButton';

import http from '../services/httpService';

import { getYMD } from './common/date';
import config from '../config.json';

class Todo extends Component {
  state = {
    selectedDate: new Date(),
    todos: [],
    titleInput: '',
  }

  async componentDidMount() {
    const { year, month, date } = getYMD(this.state.selectedDate);
    const { data: todos } = await http.get(`${config.apiEndpoint}/${year}/${month}/${date}`);
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
      await http.delete(`${config.apiEndpoint}/${todo._id}`);
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
    const response = await http.post(`${config.apiEndpoint}`, todo);
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
      await http.put(`${config.apiEndpoint}/${todo._id}`, todos[index]);
    } catch (error) {
      if (error.response && error.response.status === 400) alert('400 Error!');
      this.setState({ todos: originalTodos });
    }
  }

  handleDateChange = async (date) => {
    if (date.toDateString() === this.state.selectedDate.toDateString()) return;

    const { year, month, date: dateOfTheMonth } = getYMD(date);
    const { data: todos } = await http.get(`${config.apiEndpoint}/${year}/${month}/${dateOfTheMonth}`);
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

  renderDate = () => {
    const { selectedDate } = this.state;

  }

  render() {
    const { todos, titleInput, selectedDate } = this.state;
    const sorted = _.orderBy(todos, "date", "desc");

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
            placeholder='Input the todo title you want to add'
          />
          <List
            onClickItem={this.handleCompletionToggling}
            items={sorted}
            onDelete={this.handleDelete}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Todo;