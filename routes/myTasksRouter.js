const express = require('express');
const myTasksController = require('../controllers/myTasksController');
const jwtController = require('../controllers/jwtController');
const Task = require('../models/task');
const router = express.Router();

router.get('/', jwtController.cookie_auth, myTasksController.myTasks_page);

router.post('/addTask', jwtController.cookie_auth, myTasksController.addTask);

router.get('/getTasks', jwtController.cookie_auth, myTasksController.getTasks);

router.delete('/doneTask/:id', jwtController.cookie_auth, myTasksController.deleteTask);

router.get('/:id', jwtController.cookie_auth, myTasksController.taskDetails);

router.post('/:id', jwtController.cookie_auth, myTasksController.taskReschedule);

router.get('/categories/:category', jwtController.cookie_auth, myTasksController.filterCategories);

router.get('/priorities/:priority', jwtController.cookie_auth, myTasksController.filterPriorities);

module.exports = router;
