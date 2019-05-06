import React, { Component } from 'react';

class TodoList extends Component {

  render() {
    const {
      title,
      items,
      onClickItem,
      onDelete,
      nameProperty,
      valueProperty,
      stateProperty,
      onAllowModif,
    } = this.props;

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
                <div onClick={e => e.stopPropagation()} className="list-item-nav ml-3">
                  <i onClick={() => onDelete(item)} className="list-item-nav-btn fas fa-minus fa-lg"></i>
                  <i onClick={() => onAllowModif(item)} className="list-item-nav-btn fas fa-pencil-alt fa-lg"></i>
                  {/* <i style={{"color":"slategray"}} className="list-item-nav-btn fas fa-plus-circle fa-lg"></i> */}
                </div>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

TodoList.defaultProps = {
  valueProperty: '_id',
  nameProperty: 'title',
  stateProperty: 'isCompleted'
}

export default TodoList;