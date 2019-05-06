import React from 'react';

const Input = ({ name, label, value, error, type, placeholder, onChange, ...args }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="text-white">{label}</label>
      <input
        value={value}
        name={name}
        id={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        {...args}
      />
      {error && <div className="alert alert-danger">{error}</div> }
    </div>
  );
}

export default Input;