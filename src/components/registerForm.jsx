import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import * as registerService from '../services/registerService';

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  }

  schema = {
    username: Joi.string().email().label('Username').required(),
    password: Joi.string().min(5).max(255).label('Password').required(),
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = this.validate(this.state.data);
    if (error) {
      alert(error.details[0].message);
      const { details } = error;
      for (const detail of details) {
        console.log(detail.message);
      }
      return;
    }

    try {
      await registerService.register(this.state.data);
    }
    catch (ex) {
      alert(ex.response.data);
      return;
    }
    this.props.history.replace('/todo');
  }

  render() {
    return (
      <div className='mt-5 pt-5 col-sm-5 mx-auto align-content-center align-middle'>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'email', 'name@example.com', true)}
          {this.renderInput('password', 'Password', 'password', 'q1w2e3r4')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;