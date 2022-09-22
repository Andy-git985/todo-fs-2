const Todo = require('../models/Todo');
const Project = require('../models/Project');
const User = require('../models/User');

module.exports = {
  getDashboard: async (req, res) => {
    console.log(req.user);
    try {
      const todoItems = await Todo.find({
        // userId: req.user.id,
        privacy: 'public',
      });
      const projects = await Project.find({
        privacy: 'public',
      });
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      const users = await User.find();
      res.render('dashboard.ejs', {
        todos: todoItems,
        projects: projects,
        left: itemsLeft,
        user: req.user,
        users: users,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
