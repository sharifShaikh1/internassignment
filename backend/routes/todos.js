const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, async (req, res, next) => {
  console.log('---running the correct of post todos')
  const { text, description, dueDate } = req.body; 
  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'Todo text is required' });
  }

  try {
    const newTodoData = {
      text,
      description,
      completed: false,
      user: req.user.id
    };
    if (dueDate) {
      newTodoData.dueDate = dueDate; 
    }
    const newTodo = new Todo(newTodoData);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  const { text,description, completed, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Todo ID format' });
  }

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }

    const updateData = {};
    if (text !== undefined) updateData.text = text;
    if (description !== undefined) updateData.description = description; 
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (completed !== undefined) updateData.completed = completed;


    if (completed === true && !todo.completed) {
      updateData.completedAt = new Date();
    } else if (completed === false) {
      updateData.completedAt = null;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', auth, async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Todo ID format' });
  }

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }

    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;