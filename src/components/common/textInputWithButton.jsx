import React from 'react';

const TextInputWithButton = ({ name, inputText, buttonText, onChange, onButtonClick, ...args }) => {
  const KEY_ENTER = 13;
  return (
    // <form
    //   onSubmit={(e) => { console.log('submit'); e.preventDefault(); onButtonClick(e); }}
    //   className="input-group mb-3">
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <button onClick={onButtonClick} className="btn btn-dark"><i className="fas fa-plus"></i></button>
      </div>
      <input
        type="text"
        value={inputText}
        onChange={onChange}
        onKeyUp={(e => { if (e.keyCode === KEY_ENTER) onButtonClick(); })}
        className="form-control my-form-control-dark"
        name={name}
        aria-label=""
        aria-describedby="basic-addon1"
        {...args}
      />
    </div>
    // </form>
  );
}

export default TextInputWithButton; 
