// handeling front page
var status = true;

document.addEventListener('DOMContentLoaded', () => {
    fetch('/myTasks/getTasks').then((response) => response.json()).then((tasks) => {
        console.log(tasks.overdueTasks, tasks.todayTasks);
        display_tasks(tasks.overdueTasks, tasks.todayTasks);
    }).catch(err => console.log(err));
});

// handeling filter by:
$('.categories').on('click', '.category a', function (event) {
    const $category = $(this).data('category');
    const endpoint = `/myTasks/categories/${$category}`;
    fetch(endpoint, {
        method: 'GET'
    }).then((response) => response.json()).then((data) => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            display_tasks(data.overdueTasks, data.todayTasks);
        }
    }).catch(err => console.log(err));
});

$('.priorities').on('click', '.priority a', function (event) {
    const $category = $(this).data('priority');
    const endpoint = `/myTasks/priorities/${$category}`;
    fetch(endpoint, {
        method: 'GET'
    }).then((response) => response.json()).then((data) => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            display_tasks(data.overdueTasks, data.todayTasks);
        }
    }).catch(err => console.log(err));
});

// functions

function display_tasks(overdueTasks, todayTasks) {
    $('.overdue-tasks').empty();
    $('.today-tasks').empty();
    if (overdueTasks.length != 0) {
        $('.overdue-tasks').addClass('display');
        $('.overdue-tasks').append('<h2>Overdue tasks :</h2>');
        for (let task of overdueTasks) {
            create_overdue(task);
        }
    }
    $('.today-tasks').append("<h2>today's tasks :</h2>");
    for (task of todayTasks) {
        create_today(task);
    }
}

function create_overdue(task) { // create the outer div with the "task overdue-task red" classes
    var $task = $('<div>', {
        class: `task overdue-task ${
            task.priority
        }`
    });

    // create the "overdue-name" div
    var $overdueName = $('<div>', {
        class: 'overdue-name'
    });

    // create the "done-task" input and wrap it in an "a" tag
    var $doneTask = $('<input>', {
        type: 'checkbox',
        name: 'done-task',
        id: 'done-task'
    });
    $('<a>', {
        href: `/myTasks/done_tast/${
            task._id
        }`
    }).append($doneTask).appendTo($overdueName);

    // create the "overdue-title" h3 and "task-due-time" span and wrap them in an "a" tag
    var $overdueTitle = $('<h3>', {
        class: 'overdue-title',
        text: task.title
    });
    var $taskDueTime = $('<span>', {
        class: 'task-due-time',
        text: task.due_time
    });
    $('<a>', {
        href: `/myTasks/${
            task._id
        }`
    }).append($overdueTitle).append($taskDueTime).appendTo($overdueName);

    // append the "overdue-name" div to the "task" div
    $task.append($overdueName);

    // create the "overdue-details" div with the "task-due-date" span and "task-category" div
    var $overdueDetails = $('<div>', {
        class: 'overdue-details'
    });
    var $taskDueDate = $('<span>', {
        class: 'task-due-date',
        text: task.due_date.split('T')[0]
    });
    let icon = '';
    switch (task.category) {
        case 'work': icon = 'person';
            break;
        case 'personal': icon = 'ellipse';
            break;
        case 'shopping': icon = 'cart';
            break;
        default: icon = 'ellipse';
    }
    var $taskCategory = $('<div>', {
        class: 'task-category'
    }).append($('<ion-icon>', {
        name: icon
    })).append($('<span>', {
        text: task.category
    }));
    $overdueDetails.append($taskDueDate).append($taskCategory);

    // append the "overdue-details" div to the "task" div
    $task.append($overdueDetails);

    // create the "overdue-btns" div with the "reschedule" and "remove" buttons
    var $overdueBtns = $('<div>', {
        class: 'overdue-btns'
    });
    $('<a>', {
        href: `/myTasks/${
            task._id
        }`
    }).append($('<button>', {
        class: 'reschedule',
        text: 'Reschedule'
    })).appendTo($overdueBtns);
    $('<a>', {
        'data-taskid': `${
            task._id
        }`
    }).append($('<button>', {
        class: 'remove',
        text: 'Remove'
    })).appendTo($overdueBtns);

    // append the "overdue-btns" div to the "task" div
    $task.append($overdueBtns);

    // append the "task" div to an existing container with the id "tasks-container"
    $('.overdue-tasks').append($task);

}

function create_today(task) { // create the outer div with the "task overdue-task red" classes
    var $task = $('<div>', {
        class: `task today-task ${
            task.priority
        }`
    });

    // create the "overdue-name" div
    var $todayName = $('<div>', {
        class: 'today-name'
    });

    // create the "done-task" input and wrap it in an "a" tag
    var $doneTask = $('<input>', {
        type: 'checkbox',
        name: 'done-task',
        id: 'done-task'
    });
    $('<a>', {
        href: `/myTasks/done_tast/${
            task._id
        }`
    }).append($doneTask).appendTo($todayName);

    // create the "overdue-title" h3 and "task-due-time" span and wrap them in an "a" tag
    var $todayTitle = $('<h3>', {
        class: 'today-title',
        text: task.title
    });
    var $taskDueTime = $('<span>', {
        class: 'task-due-time',
        text: task.due_time
    });
    $('<a>', {
        href: `/myTasks/${
            task._id
        }`
    }).append($todayTitle).append($taskDueTime).appendTo($todayName);

    // append the "overdue-name" div to the "task" div
    $task.append($todayName);

    // create the "overdue-details" div with the "task-due-date" span and "task-category" div
    var $todayDetails = $('<div>', {
        class: 'today-details'
    });
    var $taskDueDate = $('<span>', {
        class: 'task-due-date',
        text: task.due_date.split('T')[0]
    });
    let icon = '';
    switch (task.category) {
        case 'work': icon = 'person';
            break;
        case 'personal': icon = 'ellipse';
            break;
        case 'shopping': icon = 'cart';
            break;
        default: icon = 'ellipse';
    }
    var $taskCategory = $('<div>', {
        class: 'task-category'
    }).append($('<ion-icon>', {
        name: icon
    })).append($('<span>', {
        text: task.category
    }));
    $todayDetails.append($taskDueDate).append($taskCategory);

    // append the "overdue-details" div to the "task" div
    $task.append($todayDetails);

    // create the "overdue-btns" div with the "reschedule" and "remove" buttons
    var $todayBtns = $('<div>', {
        class: 'today-btns'
    });
    $('<a>', {
        'data-taskid': `${
            task._id
        }`
    }).append($('<button>', {
        class: 'remove',
        text: 'remove'
    })).appendTo($todayBtns);

    // append the "overdue-btns" div to the "task" div
    $task.append($todayBtns);

    // append the "task" div to an existing container with the id "tasks-container"
    $('.today-tasks').append($task);

}
// send request to delete task

$('.tasks').on('click', '.remove', function (event) {
    const taskId = $(event.target).closest('.task').find('[data-taskid]').data('taskid');
    const endpoint = '/myTasks/doneTask/' + taskId;
    fetch(endpoint, {
        method: 'DELETE'
    }).then((response) => response.json()).then((data) => {
        window.location.href = data.redirect;
    }).catch(err => console.log(err));
});
