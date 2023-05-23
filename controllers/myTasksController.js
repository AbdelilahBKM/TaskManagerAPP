const Task = require('../models/task');

const myTasks_page = (req, res) => {
    Task.find({
        user: req.user._id
    }).then((result) => {
        console.log(result);
        const tasks = result;
        return res.render('myTasks', {
            title: 'myTasks',
            user: req.user,
            tasks: tasks
        });
    }).catch(err => console.log(err));
}

const addTask = (req, res) => {
    const new_task = new Task({
        title: req.body.title,
        category: req.body.category,
        priority: req.body.priority,
        due_date: req.body.due_date,
        due_time: req.body.due_time,
        note: req.body.note,
        user: req.user._id
    });
    console.log(new_task);
    new_task.save().then((task) => {
        console.log(task);
        res.redirect('/myTasks')
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

const getTasks = (req, res) => {
    Task.find({
        user: req.user._id
    }).then((results) => {
        const tasks = categorizeTasks(results);
        const tasksData = {
            overdueTasks: tasks.overdueTasks,
            todayTasks: tasks.todayTasks
        };
        return res.json(tasksData);
    }).catch(err => console.log(err));
}

const deleteTask = (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id).then(() => {
        res.json({
            redirect: '/myTasks'
        });
    }).catch(err => console.log(err));
}

const taskDetails = (req, res) => {
    const id = req.params.id;
    Task.findById(id).then((Task) => {
        res.render('taskDetails', {
            title: 'Task details',
            Task: Task
        });
    })
}

const taskReschedule = (req, res) => {
    const task_id = req.params.id;
    const {
        due_date,
        due_time
    } = req.body;
    console.log('updated task =========>');
    console.log(req.body);
    Task.findByIdAndUpdate(task_id, {
        due_date,
        due_time
    }).then(() => {
        res.redirect('/myTasks');
    }).catch(err => console.log(err));
}

const filterCategories = (req, res) => {
    let category = req.params.category;
    if (category == 'all') {
        return res.json({
            redirect: '/myTasks'
        })
    }
    Task.find({
        category: category,
        user: req.user._id
    }).then((data) => {
        const tasks = categorizeTasks(data);
        return res.json({
            overdueTasks: tasks.overdueTasks,
            todayTasks: tasks.todayTasks
        });
    }).catch(err => console.log(err));
}

const filterPriorities = (req, res) => {
    let priority = req.params.priority;
    if (priority == 'all') {
        return res.json({
            redirect: '/myTasks'
        })
    }
    Task.find({
        priority: priority,
        user: req.user._id
    }).then((data) => {
        const tasks = categorizeTasks(data);
        return res.json({
            overdueTasks: tasks.overdueTasks,
            todayTasks: tasks.todayTasks
        })
    }).catch(err => console.log(err));
}
module.exports = {
    myTasks_page,
    addTask,
    getTasks,
    deleteTask,
    taskDetails,
    taskReschedule,
    filterCategories,
    filterPriorities
};

// reusable function:

function categorizeTasks(tasks) {
    const today = new Date();
    const todayDate = today.toISOString().slice(0, 10);
    const todayTime = today.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    const overdueTasks = [];
    const todayTasks = [];
    for (let task of tasks) {
        const taskDueDate = task.due_date.toISOString().slice(0, 10);
        const taskDueTime = task.due_time;
        console.log(`todays date :${todayDate}, task date: ${taskDueDate}`);
        console.log(taskDueDate < todayDate);
        if (taskDueDate < todayDate) {
            overdueTasks.push(task);
        } else if (taskDueDate === todayDate) {
            if (taskDueTime < todayTime) {
                overdueTasks.push(task);
            } else {
                todayTasks.push(task);
            }
        }
    }
    return {
        overdueTasks,
        todayTasks
    };
}
