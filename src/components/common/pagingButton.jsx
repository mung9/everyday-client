import React from 'react';

const PagingButton = ({ onPageLeft, onPageRight }) => {
  return (
    <div className="paging">
      <a onClick={onPageLeft} className="carousel-control-prev" href="#myCarousel" role="button" data-slide="next">
        <button className="btn btn-secondary">{'<<'}</button>
        <span className="sr-only">Next</span>
      </a>
      <a onClick={onPageRight} className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <button className="btn btn-secondary">{'>>'}</button>
        <span className="sr-only">Prev</span>
      </a>
    </div>
  );
}

export default PagingButton;