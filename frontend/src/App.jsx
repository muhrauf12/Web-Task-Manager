import React, { useEffect, useMemo, useState } from 'react'
import { fetchTasks, createTask, updateTask, deleteTask } from './api'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import Filters from './components/Filters.jsx'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const cached = localStorage.getItem('tasks-cache')
      return cached ? JSON.parse(cached) : []
    } catch { return [] }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetchTasks()
      .then(data => { if (isMounted) { setTasks(data); localStorage.setItem('tasks-cache', JSON.stringify(data)) } })
      .catch(err => { if (isMounted) setError(err?.response?.data?.error || err.message) })
      .finally(() => isMounted && setLoading(false))
    return () => { isMounted = false }
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'completed') return tasks.filter(t => t.completed)
    if (filter === 'incomplete') return tasks.filter(t => !t.completed)
    return tasks
  }, [tasks, filter])

  async function handleAdd(newTask) {
    setError('')
    try {
      const created = await createTask(newTask)
      const next = [created, ...tasks]
      setTasks(next)
      localStorage.setItem('tasks-cache', JSON.stringify(next))
    } catch (e) {
      setError(e?.response?.data?.error || e.message)
    }
  }

  async function handleToggle(id, completed) {
    setError('')
    try {
      const updated = await updateTask(id, { completed })
      const next = tasks.map(t => (t._id === id ? updated : t))
      setTasks(next)
      localStorage.setItem('tasks-cache', JSON.stringify(next))
    } catch (e) {
      setError(e?.response?.data?.error || e.message)
    }
  }

  async function handleDelete(id) {
    setError('')
    try {
      await deleteTask(id)
      const next = tasks.filter(t => t._id !== id)
      setTasks(next)
      localStorage.setItem('tasks-cache', JSON.stringify(next))
    } catch (e) {
      setError(e?.response?.data?.error || e.message)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Web Task Manager</h1>
        <p className="mono">React + Express + MongoDB (or in‑memory)</p>

        {error && <div className="badge red" role="alert">Error: {error}</div>}
        {loading && <div className="badge yellow">Loading…</div>}

        <TaskForm onAdd={handleAdd} />

        <hr />

<div className="filters">
  <Filters value={filter} onChange={setFilter} />
</div>

<TaskList tasks={filtered} onToggle={handleToggle} onDelete={handleDelete} />

      </div>
    </div>
  )
}
