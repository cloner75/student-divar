const Setting = {
    address: 'http://localhost:3000/',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29yZSI6eyJzdW0iOjEwMCwiZGlzdGFuY2UiOjEwLCJncmFkZVBvaW50QXZlcmFnZSI6MjAsInF1b3RhIjo0MCwidGVybSI6MzB9LCJzdGF0dXMiOiIxIiwiaXNVc2VyIjp0cnVlLCJfaWQiOiI2MDMwZGIxNGYzNGNlNjRmMzFjNjU3MDIiLCJyZW50Ijp7InBhaWQiOmZhbHNlfSwiZW1haWwiOiJlaHNhbkByYXljaGF0LmlvIiwidXNlcm5hbWUiOiJlaHNhbiIsInVwZGF0ZWRBdCI6IjIwMjEtMDItMjBUMDk6NDk6MDguMTk3WiIsImNyZWF0ZWRBdCI6IjIwMjEtMDItMjBUMDk6NDk6MDguMTk3WiIsImlhdCI6MTYxNDMzODIyNCwiZXhwIjoxNjE0NDI0NjI0fQ.mGc9ubWtI6mQvLq87GgyK2-q58H0NeW_dJ_FNhKLL7g'
};

function signIn(email, password, url) {
    axios.post(Setting.address.concat('authorization/signin'), {
        email,
        password
    })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            window.location.href = url;
        })
        .catch(err => {
            alert('نام کاربری یا رمز عبور اشتباه است');
            console.log(`error : ${err.message}`);
        });
}

function signUp(email, password, url) {
    alert(url)
    axios.post(`${Setting.address}authorization/signup`, {
        password,
        email
    })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            window.location.href = url;
        })
        .catch(err => alert(`error: ${err.message}`));
}