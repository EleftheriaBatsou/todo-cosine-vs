import React from 'react';
import TodoItem from './TodoItem.jsx';

function TodoList({ items, onToggle, onDelete, onUpdate }) {
  if (!items.length) return null;

  return (
    <ul className="todo-list">
      {items.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
          onUpdate={(text) => onUpdate(item.id, text)}
        />
      ))}
    </ul>
  );
}

export default TodoList;