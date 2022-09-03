const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, todosController.getTodos);

router.post('/createTodo', todosController.createTodo);
router.post('/projects', todosController.createProject);
router.put('/markComplete', todosController.markComplete);

router.put('/markIncomplete', todosController.markIncomplete);

router.delete('/deleteTodo', todosController.deleteTodo);
router.delete('/items', todosController.deleteItem);

module.exports = router;
