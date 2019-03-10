import React from 'react';

const TextInputWithButton = ({ name, inputText, buttonText, onChange, onButtonClick, ...args }) => {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onButtonClick(e); }}
      className="input-group mb-3">
      <div className="input-group-prepend">
        <button onClick={onButtonClick} className="btn btn-outline-secondary">{buttonText}</button>
      </div>
      <input
        type="text"
        value={inputText}
        onChange={onChange}
        className="form-control"
        name={name}
        aria-label=""
        aria-describedby="basic-addon1"
        {...args}
      />
    </form>
  );
}

export default TextInputWithButton; 
