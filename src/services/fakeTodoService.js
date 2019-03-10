export const todos = [
  {
    _id: '123456',
    date: new Date('Mar 9, 2019'),
    title: '집에가서 맛있게 밥먹기',
    isCompleted: false,
  },
  {
    _id: '234561',
    date: new Date('Mar 9, 2019'),
    title: '자전거타고 다니기',
    isCompleted: false,
  },
  {
    _id: '561234',
    date: new Date('Mar 9, 2019'),
    title: '못 받은 돈 받아내기',
    isCompleted: false,
  },
  {
    _id: '345612',
    date: new Date('Mar 8, 2019'),
    title: '물 먹기',
    isCompleted: false,
  },
  {
    _id: '456123',
    date: new Date('Mar 8, 2019'),
    title: '잠 자기',
    isCompleted: false,
  }
];

export function getTodos(date) {
  if (!date) return todos;
  
  return todos.filter((todo) => {
    return todo.date.toDateString() === date.toDateString()
  });
};

export function setTodo(o) {
  const { _id } = o;
  if (_id) {
    let todo = todos.find((todoItem) => todoItem._id === _id);
    if (!todo) return null;

    todo = { ...o };
    return o;
  }

  o._id = Date.now();
  o.isCompleted = false;
  todos.push(o);

  console.log('total todo:', todos);

  return o;
}