import React from 'react'

export default function Filters({ value, onChange }) {
  return (
    <div className="row">
      <button
        className={`filter-btn ${value === 'all' ? 'active' : ''}`}
        onClick={() => onChange('all')}
        aria-pressed={value === 'all'}
      >
        All
      </button>

      <button
        className={`filter-btn ${value === 'completed' ? 'active' : ''}`}
        onClick={() => onChange('completed')}
        aria-pressed={value === 'completed'}
      >
        Completed
      </button>

      <button
        className={`filter-btn ${value === 'incomplete' ? 'active' : ''}`}
        onClick={() => onChange('incomplete')}
        aria-pressed={value === 'incomplete'}
      >
        Incomplete
      </button>
    </div>
  )
}
