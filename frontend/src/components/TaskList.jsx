import React from 'react'
import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p>No tasks yet. Add one above!</p>
  return (
    <div>
      {tasks.map(t => (
        <TaskItem key={t._id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
