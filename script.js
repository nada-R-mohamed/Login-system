
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const registerError = document.getElementById('registerError');
    const loginError = document.getElementById('loginError');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logoutButton');

    // local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidName(name) {
        return name.length >= 3 && !/^\d+$/.test(name);
    }
    function isValidPassword(password) {
        return password.length > 3;
    }

    // register
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = registerForm.name.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;

            if (!isValidName(name)) {
                registerError.textContent = 'Name must be at least 3 characters';
                return;
            }

            if (!isValidEmail(email)) {
                registerError.textContent = 'Invalid email format. Email must contain "@" and ".com".';
                return;
            }

            if (!isValidPassword(password)) {
                registerError.textContent = 'Password must be more than 3 characters .';
                return;
            }
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                registerError.textContent = 'Email is already registered.';
            } else {
                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = 'login.html';
            }
        });
    }
    //login
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                loginError.textContent = 'Incorrect email or password.';
            }
        });
    }

    //home page
    if (welcomeMessage) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            window.location.href = 'login.html';
        } else {
            welcomeMessage.textContent = `Welcome ${loggedInUser.name}`;
        }

        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
});

