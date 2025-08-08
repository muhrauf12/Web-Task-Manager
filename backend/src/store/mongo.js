const Task = require('../models/Task');

module.exports = {
  async findAll() {
    return Task.find().sort({ createdAt: -1 });
  },
  async create(data) {
    const t = new Task(data);
    await t.save();
    return t.toObject();
  },
  async update(id, data) {
    return Task.findByIdAndUpdate(id, data, { new: true });
  },
  async remove(id) {
    const res = await Task.findByIdAndDelete(id);
    return !!res;
  }
};
