const other_element = document.querySelectorAll('.content-blur');
const add_task_btn = document.querySelector('.add-task');
const task_wrapper = document.querySelector('.add-task-container');
const close_btn = document.querySelector('.icon-close');
const close2 = document.querySelector('#close-btn');

add_task_btn.addEventListener('click', () => {
    task_wrapper.classList.add('active-popup');
    other_element.forEach(element => {
        element.classList.add('active-blur');
    });


});

close_btn.addEventListener('click', () => {
    task_wrapper.classList.remove('active-popup');
    other_element.forEach(element => {
        element.classList.remove('active-blur');
    });
});

close2.addEventListener('click', () => {
    task_wrapper.classList.remove('active-popup');
    other_element.forEach(element => {
        element.classList.remove('active-blur');
    });
});

const handleOnMouseMove = e => {
    const {
        currentTarget: target
    } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${x}px`);
};
for (const task of document.querySelectorAll('.task')) {
    task.addEventListener('mousemove', e => handleOnMouseMove(e));
}
