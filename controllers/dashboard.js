const Todo = require('../models/Todo');
const Project = require('../models/Project');
const User = require('../models/User');

module.exports = {
  getDashboard: async (req, res) => {
    console.log(req.user);
    try {
      const todos = await Todo.find({
        // userId: req.user.id,
        privacy: 'public',
      });
      const projects = await Project.find({
        privacy: 'public',
      });
      const users = await User.find();
      res.render('dashboard.ejs', {
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
      const todos = await Todo.find({
        project: String(projectId._id),
        privacy: 'public',
      });
      const projects = await Project.find({
        privacy: 'public',
      });
      const users = await User.find();
      res.render('dashboard.ejs', {
        todos: todos,
        projects: projects,
        user: req.user,
        users: users,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
