import React, { Component } from 'react';
// import _ from 'lodash';
import PagingButton from './common/pagingButton';
import List from './common/list';
import { getTodos, setTodo } from '../services/fakeTodoService';
import DateNav from './common/dateNav';

import TextInputWithButton from './common/textInputWithButton';

class Todo extends Component {
  state = {
    selectedDate: new Date(),
    todos: [],
    titleInput: '',
  }

  componentDidMount() {
    const todos = getTodos(this.state.selectedDate);
    this.setState({ todos });
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  }

  handleAddTodo = () => {
    const { titleInput: title, selectedDate } = this.state;
    if (!title) {
      return;
    }

    setTodo({
      date: selectedDate,
      title,
    });

    const todos = getTodos(selectedDate);
    this.setState({ todos, titleInput: '' });
  }

  handleComplete = (todo) => {
    todo.isCompleted = true;
    todo.completedDate = new Date();
    todo = setTodo(todo);

    const todos = getTodos(this.state.selectedDate);
    this.setState({ todos });
  }

  handleDateChange = (date) => {

    this.setState({selectedDate: date});
  }

  handlePrevDate = () => {
    const selectedDate = new Date(this.state.selectedDate);
    selectedDate.setDate(selectedDate.getDate() - 1);

    const todos = getTodos(selectedDate);
    this.setState({ selectedDate, todos });
  }

  handleNextDate = () => {
    const selectedDate = new Date(this.state.selectedDate);
    selectedDate.setDate(selectedDate.getDate() + 1);

    const todos = getTodos(selectedDate);
    this.setState({ selectedDate, todos });
  }

  renderDate = () => {
    const { selectedDate } = this.state;

  }

  render() {
    const { todos, titleInput, selectedDate } = this.state;
    return (
      <React.Fragment>
        <DateNav date={selectedDate} onChange={this.handleDateChange} />
        <div className="mt-5 pt-5 col-sm-8 mx-auto">
          <TextInputWithButton
            name="titleInput"
            inputText={titleInput}
            buttonText="Add"
            onChange={this.handleChange}
            onButtonClick={this.handleAddTodo}
            placeholder='Input the todo title you want to add'
          />
          <List
            onClickItem={this.handleComplete}
            items={todos}
          />
        </div>
        <PagingButton onPageLeft={this.handlePrevDate} onPageRight={this.handleNextDate} />
      </React.Fragment>
    );
  }
}

export default Todo;