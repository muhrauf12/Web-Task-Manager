let tasks = [];
let idCounter = 1;

module.exports = {
  async findAll() {
    return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  async create(data) {
    const now = new Date();
    const t = {
      _id: String(idCounter++),
      title: data.title,
      description: data.description || '',
      completed: !!data.completed,
      priority: data.priority || 'low',
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      createdAt: now,
      updatedAt: now,
    };
    tasks.unshift(t);
    return t;
  },
  async update(id, data) {
    const idx = tasks.findIndex(t => t._id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...data, updatedAt: new Date() };
    return tasks[idx];
  },
  async remove(id) {
    const idx = tasks.findIndex(t => t._id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  }
};
