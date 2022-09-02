const Todo = require('../models/Todo');
const Project = require('../models/Project');

module.exports = {
  getDashboard: async (req, res) => {
    console.log(req.user);
    try {
      const todoItems = await Todo.find({
        userId: req.user.id,
        privacy: 'public',
      });
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
};
