const wrapper = document.querySelector('.wrapper');
const login_link = document.querySelector('.login-link');
const register_link = document.querySelector('.register-link');
const btn_popup = document.querySelector('.btn-login-popup');
const icon_close = document.querySelector('.icon-close');
const other_element = document.querySelector('.content-blur');

register_link.addEventListener('click', () => {
    wrapper.classList.add('active');
});

login_link.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btn_popup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    other_element.classList.add('active-blur');
});

icon_close.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    other_element.classList.remove('active-blur');

});
add_task()
