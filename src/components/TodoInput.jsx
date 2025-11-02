import React, { useState } from 'react';

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form className="todo-input" onSubmit={submit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New todo item"
      />
      <button type="submit" disabled={!text.trim()}>Add</button>
    </form>
  );
}

export default TodoInput;