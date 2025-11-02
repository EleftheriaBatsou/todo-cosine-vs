import React, { useEffect, useMemo, useState } from 'react';
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';
import FilterBar from './components/FilterBar.jsx';

const STORAGE_KEY = 'todo_cosine_vs_items';

function App() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (filter === 'active') return items.filter(i => !i.completed);
    if (filter === 'completed') return items.filter(i => i.completed);
    return items;
  }, [items, filter]);

  const addItem = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newItem = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setItems(prev => [newItem, ...prev]);
  };

  const toggleItem = (id) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, completed: !i.completed } : i)));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setItems(prev => prev.map(i => (i.id === id ? { ...i, text: trimmed } : i)));
  };

  const clearCompleted = () => {
    setItems(prev => prev.filter(i => !i.completed));
  };

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter(i => i.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [items]);

  return (
    <div className="app">
      <header className="header">
        <h1>Todo</h1>
        <p className="subtitle">No login. Local storage. Deploy-ready.</p>
      </header>

      <main className="container">
        <TodoInput onAdd={addItem} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          stats={stats}
          onClearCompleted={clearCompleted}
        />
        <TodoList
          items={filteredItems}
          onToggle={toggleItem}
          onDelete={deleteItem}
          onUpdate={updateItem}
        />
        {items.length === 0 && (
          <p className="empty">Add your first task above.</p>
        )}
      </main>

      <footer className="footer">
        <span className="muted">Saved locally • MIT License</span>
      </footer>
    </div>
  );
}

export default App;