const Todo = require('../models/Todo');
const Project = require('../models/Project');
const User = require('../models/User');

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user });
      const projects = await Project.find({
        $or: [{ user: req.user }, { privacy: 'public' }],
      });
      const users = await User.find();
      res.render('todos.ejs', {
        todos: todos,
        projects: projects,
        user: req.user,
        users: users,
      });
    } catch (err) {
      console.log(err);
    }
  },
  filterByProject: async (req, res) => {
    try {
      const projectId = await Project.findOne({ title: req.query.project });
      const todos = await Todo.find({ project: String(projectId._id) });
      const projects = await Project.find({
        $or: [{ user: req.user }, { privacy: 'public' }],
      });
      res.render('todos.ejs', {
        todos: todos,
        projects: projects,
        user: req.user,
      });
    } catch (error) {
      console.error(error);
    }
  },
  createTodo: async (req, res) => {
    console.log(req.body);
    try {
      const project = await Project.findOne({ title: req.body.project });
      await Todo.create({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        progress: req.body.progress,
        project: project,
        privacy: req.body.privacy,
        user: req.user,
      });
      console.log('Todo has been added!');
      res.redirect('/todos');
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
      const newProject = await Project.create({
        title: req.body.title,
        privacy: req.body.privacy,
        user: req.user,
      });
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
  // app.delete('/items', async (req, res) => {
  deleteItem: async (req, res) => {
    try {
      console.log('test');
      console.log(req.params.id);
      await Todo.findByIdAndDelete({ _id: req.params.id });
      console.log('Item deleted');
      res.redirect('/todos');
    } catch (error) {
      console.error(error);
    }
  },
  // ? Handles updates to item's fields
  // app.put('/items', async (req, res) => {
  updateItem: async (req, res) => {
    try {
      console.log(req.params.id);
      // const id = await req.body.req['_id'];
      // const data = await req.body.req.data;
      // const search = await Todo.findById(id);
      // Object.assign(search, data);
      // await search.save();
      // res.json('Item updated');
    } catch (error) {
      console.error(error);
    }
  },
};
