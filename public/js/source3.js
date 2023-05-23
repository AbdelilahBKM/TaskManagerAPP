const logout = document.querySelector('.btn-logout-popup');
const delete_btn = document.querySelector('.delete-account');
const logout_confirm = document.querySelector('.confirm-logout');
const delete_confirm = document.querySelector('.confirm-delete');
const blur_content = document.querySelectorAll('.content-blur');
const close_btn = document.querySelector('.close-btn');
const close_btn2 = document.querySelector('.close-btn2');
const eyecon = document.querySelector('.icon-hide-show');
const password_field = document.querySelector('#password-input');

// popup logout message
logout.addEventListener('click', () => {
    logout_confirm.classList.add('active');
    blur_content.forEach((content) => content.classList.add('blur'));
});

// popup delete account message
delete_btn.addEventListener('click', () => {
    delete_confirm.classList.add('active');
    blur_content.forEach((content) => content.classList.add('blur'));
});

// close popup message button
close_btn.addEventListener('click', () => {
    logout_confirm.classList.remove('active');
    blur_content.forEach((content) => content.classList.remove('blur'));
});

close_btn2.addEventListener('click', () => {
    delete_confirm.classList.remove('active');
    blur_content.forEach((content) => content.classList.remove('blur'));
});

// show & hide password
eyecon.addEventListener('click', () => {
    let data_type = password_field.getAttribute('data-type');
    if (data_type === 'hidden') {
        password_field.type = 'text';
        password_field.setAttribute('data-type', 'text');
        eyecon.name = 'eye-off';
    } else {
        password_field.type = 'password';
        password_field.setAttribute('data-type', 'hidden');
        eyecon.name = 'eye';
    }
});

const trash = document.querySelector('#delete-account');

trash.addEventListener('click', () => {
    const userId = trash.getAttribute('data-doc');
    const endpoint = '/account/' + userId;
    fetch(endpoint, {
        method: 'DELETE'
    }).then((response) => response.json()).then((data) => window.location.href = data.redirect).catch(err => console.log(err));
});
