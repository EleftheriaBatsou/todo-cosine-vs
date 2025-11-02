import React, { useEffect, useRef, useState } from 'react';

function TodoItem({ item, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const save = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setText(item.text);
    } else {
      onUpdate(trimmed);
    }
    setEditing(false);
  };

  return (
    <li className={`todo-item ${item.completed ? 'completed' : ''}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={onToggle}
          aria-label={item.completed ? 'Mark as active' : 'Mark as completed'}
        />
      </label>

      {editing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') {
              setEditing(false);
              setText(item.text);
            }
          }}
        />
      ) : (
        <span
          className="item-text"
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
        >
          {item.text}
        </span>
      )}

      <div className="item-actions">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={onDelete} className="danger">Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;