import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
export const api = axios.create({ baseURL: API_URL })

export async function fetchTasks() {
  const { data } = await api.get('/tasks')
  return data
}

export async function createTask(task) {
  const { data } = await api.post('/tasks', task)
  return data
}

export async function updateTask(id, updates) {
  const { data } = await api.put(`/tasks/${id}`, updates)
  return data
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`)
}
