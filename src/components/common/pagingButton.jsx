import React from 'react';

const PagingButton = ({ onPageLeft, onPageRight }) => {
  return (
    <div className="paging">
      {/* <div className="paging-control-prev"> */}
        <button onClick={onPageLeft} className="btn badge badge-pill"><i className="fas fa-caret-left fa-6x"></i></button>
        <span className="sr-only">Next</span>
      {/* </div> */}
      {/* <div className="paging-control-next"> */}
        <button onClick={onPageRight} className="badge badge-pill btn"><i className="fas fa-caret-right fa-6x"></i></button>
        <span className="sr-only">Prev</span>
      {/* </div> */}
    </div>
  );
}

export default PagingButton;