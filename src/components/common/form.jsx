import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  schema = {};

  validate = () => {
    return Joi.validate(this.state.data, this.schema, { abortEarly: false });
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    return Joi.validate(obj, schema);
  }

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const { error } = this.validateProperty(currentTarget);
    if (error) {
      const detail = error.details[0];
      errors[currentTarget.name] = detail.message;
    }
    else {
      if (errors[currentTarget.name])
        delete errors[currentTarget.name];
    }

    console.log(errors);

    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data, errors });
  }

  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>
  }

  renderInput(name, label, type = 'text', placeholder = '', autoFocus) {
    const { errors, data } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        name={name}
        label={label}
        value={data[name]}
        type={type}
        placeholder={placeholder}
        error={errors[name]}
        autoFocus={autoFocus}
      />

    );
  }
}

export default Form;