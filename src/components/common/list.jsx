import React from 'react';

const List = ({ title, items, onClickItem, nameProperty, valueProperty, stateProperty }) => {
  const liClasses = "list-group-item text-center ";

  return (
    <div className="list mx-auto">
      <h4 className='list-title'>{title}</h4>
      <ul className="list-group">
        {
          items.map((item) => <li
            onClick={() => onClickItem && onClickItem(item)}
            key={item[valueProperty]}
            value={item}
            className={liClasses+(item[stateProperty]?"list-group-item-checked":null)}
          >
            {item[nameProperty]}
          </li>)
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