import React, { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')
  const [dueDate, setDueDate] = useState('')

  function reset() {
    setTitle(''); setDescription(''); setPriority('low'); setDueDate('')
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title: title.trim(), description: description.trim(), priority, dueDate: dueDate || undefined })
    reset()
  }

  return (
    <form onSubmit={onSubmit} className="row" style={{ flexWrap: 'wrap' }}>
      <input placeholder="Task title *" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button className="primary" type="submit">Add Task</button>
    </form>
  )
}
