import React from 'react';

function FilterBar({ filter, setFilter, stats, onClearCompleted, onExport }) {
  return (
    <div className="filter-bar">
      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({stats.active})
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
      </div>
      <div className="actions">
        <button onClick={onClearCompleted} disabled={stats.completed === 0}>
          Clear Completed
        </button>
        <button onClick={onExport} disabled={stats.total === 0} title="Download todos as CSV">
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default FilterBar;