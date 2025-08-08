import React from 'react'

function Badge({ priority }) {
  const map = { low: 'green', medium: 'yellow', high: 'red' }
  return <span className={'badge ' + (map[priority] || 'green')}>{priority}</span>
}

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task">
      <label className="task-main">
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={e => onToggle(task._id, e.target.checked)}
        />
        <div className="task-body">
          <div
            className="task-title"
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
          </div>
          {task.description && <div className="task-desc">{task.description}</div>}

          <div className="task-meta mono">
            <Badge priority={task.priority} />
            {task.dueDate && <span>· due {new Date(task.dueDate).toLocaleDateString()}</span>}
          </div>
        </div>
      </label>

      <button className="ghost" onClick={() => onDelete(task._id)}>🗑️</button>
    </div>
  )
}
