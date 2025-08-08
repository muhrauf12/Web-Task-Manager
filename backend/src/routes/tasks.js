const express = require('express');
const router = express.Router();
const store = require('../store');

// GET /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await store.findAll();
    res.json(tasks);
  } catch (e) { next(e); }
});

// POST /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = await store.create({ title, description, priority, dueDate, completed: false });
    res.status(201).json(task);
  } catch (e) { next(e); }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await store.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) { next(e); }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await store.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (e) { next(e); }
});

module.exports = router;
