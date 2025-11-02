import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';
import FilterBar from './components/FilterBar.jsx';

const STORAGE_KEY = 'todo_cosine_vs_items';

function initItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function itemsReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const text = action.text.trim();
      if (!text) return state;
      const newItem = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      };
      return [newItem, ...state];
    }
    case 'toggle': {
      const id = action.id;
      return state.map(i => (i.id === id ? { ...i, completed: !i.completed } : i));
    }
    case 'delete': {
      const id = action.id;
      return state.filter(i => i.id !== id);
    }
    case 'update': {
      const { id, text } = action;
      const trimmed = text.trim();
      if (!trimmed) return state;
      return state.map(i => (i.id === id ? { ...i, text: trimmed } : i));
    }
    case 'clearCompleted': {
      return state.filter(i => !i.completed);
    }
    default:
      return state;
  }
}

function App() {
  const [items, dispatch] = useReducer(itemsReducer, [], initItems);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (filter === 'active') return items.filter(i => !i.completed);
    if (filter === 'completed') return items.filter(i => i.completed);
    return items;
  }, [items, filter]);

  // Stable callbacks (avoid unnecessary re-renders in child components)
  const addItem = useCallback((text) => dispatch({ type: 'add', text }), [dispatch]);
  const toggleItem = useCallback((id) => dispatch({ type: 'toggle', id }), [dispatch]);
  const deleteItem = useCallback((id) => dispatch({ type: 'delete', id }), [dispatch]);
  const updateItem = useCallback((id, text) => dispatch({ type: 'update', id, text }), [dispatch]);
  const clearCompleted = useCallback(() => dispatch({ type: 'clearCompleted' }), [dispatch]);

  const exportCSV = useCallback(() => {
    const headers = ['id', 'text', 'completed', 'createdAt'];
    const escape = (value) => {
      const v = String(value ?? '');
      // Escape quotes by doubling them and wrap in quotes
      return `"${v.replace(/"/g, '""')}"`;
    };
    const rows = items.map(i => [
      escape(i.id),
      escape(i.text),
      escape(i.completed ? 'true' : 'false'),
      escape(new Date(i.createdAt).toISOString()),
    ].join(','));
    const csv = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todos-${new Date().toISOString().slice(0,19).replace(/[:T]/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [items]);

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
          onExport={exportCSV}
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