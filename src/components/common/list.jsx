import React from 'react';

const List = ({ title, items, onClickItem, onDelete, nameProperty, valueProperty, stateProperty }) => {
  const liClasses = "list-group-item text-center text-break mb-1 ";

  return (
    <div className="list mx-auto">
      <h4 className='list-title'>{title}</h4>
      <ul className="list-group">
        {
          items.map((item) =>
            <li
              onClick={() => onClickItem && onClickItem(item)}
              key={item[valueProperty]}
              value={item}
              className={liClasses + (item[stateProperty] ? "list-group-item-checked" : null)}
            >
              {item[nameProperty]}
              <div className="list-item-nav ml-3">
                <i onClick={(e) => { e.stopPropagation(); onDelete(item); }} className="list-item-nav-btn fas fa-minus fa-lg"></i>
                {/* <i style={{"color":"slategray"}} className="list-item-nav-btn fas fa-plus-circle fa-lg"></i> */}
              </div>
            </li>
          )
        }
      </ul>
    </div>
  );
}

List.defaultProps = {
  valueProperty: '_id',
  nameProperty: 'title',
  stateProperty: 'isCompleted'
}

export default List;