const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

router.get('/stats/summary', auth, async (req, res) => {
  try {
    const total     = await Task.countDocuments({ user: req.user });
    const completed = await Task.countDocuments({ user: req.user, completed: true });
    const pending   = await Task.countDocuments({ user: req.user, completed: false });
    const overdue   = await Task.countDocuments({
      user: req.user, completed: false, dueDate: { $lt: new Date() }
    });
    res.json({ total, completed, pending, overdue });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { status, search, sort } = req.query;
    let query = { user: req.user };

    if (status === 'completed') query.completed = true;
    if (status === 'pending')   query.completed = false;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest')   sortOption = { createdAt: 1 };
    if (sort === 'priority') sortOption = { priority: -1 };
    if (sort === 'dueDate')  sortOption = { dueDate: 1 };

    const tasks = await Task.find(query).sort(sortOption);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
router.delete('/completed/all', auth, async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user, completed: true });
    res.json({ msg: 'All completed tasks deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;