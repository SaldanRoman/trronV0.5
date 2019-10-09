let useresArrObj;
(function () {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            useresArrObj = JSON.parse(xhr.response);
            changeBreadcrumbs('Log in');
            goToUserPage()
        }
    };
    xhr.open("GET", "../jsons/users.json", true);
    xhr.send();
})();

function changeBreadcrumbs(value) {
    document.querySelector('.breadcrumb').innerHTML = '';
    breadcrumbs = [{
        name: value,
        link: "#"
    }]
    addPointToBreadcrumbMap(breadcrumbs)
}

function goToUserPage() {
    const user = localStorage.getItem('user')
    if (user === null || user === '') {
        return
    }
    document.location.replace("user.html?" + user);
}

function logIn(form) {
    event.preventDefault();

    function checkUserName(data) {
        return data.name === form[0].value
    }

    function checkUserPassword(data) {
        return data.password === form[1].value
    }

    if (form[0].value === '') {
        return
    }

    if (useresArrObj.some(checkUserName)) {
        form[0].style.borderColor = '#fca53c';
        if (useresArrObj.some(checkUserPassword)) {
            form[1].style.borderColor = '#fca53c';
            localStorage.setItem('user', form[0].value)

        } else {
            form[1].style.borderColor = '#ab2e46';
            form[1].value = '';
            form[1].placeholder = 'Incorrect password !';
        }
    } else {
        form[0].style.borderColor = '#ab2e46';
        form[0].value = '';
        form[0].placeholder = 'User not found !';
    }
}