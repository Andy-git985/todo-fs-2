const Todo = require('../models/Todo');
const Project = require('../models/Project');

module.exports = {
  getTodos: async (req, res) => {
    console.log(req.user);
    try {
      const todoItems = await Todo.find({ userId: req.user.id });
      const projectItems = await Project.find();
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      res.render('todos.ejs', {
        todos: todoItems,
        projects: projectItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    console.log(req.body);
    try {
      await Todo.create({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        progress: req.body.progress,
        userId: req.user.id,
      });
      console.log('Todo has been added!');
      res.redirect('/todos');
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
      const newProject = await new Project(req.body);
      await newProject.save();
      res.redirect('/todos');
    } catch (error) {
      console.error(error);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log('Marked Complete');
      res.json('Marked Complete');
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log('Marked Incomplete');
      res.json('Marked Incomplete');
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log('Deleted Todo');
      res.json('Deleted It');
    } catch (err) {
      console.log(err);
    }
  },
};
