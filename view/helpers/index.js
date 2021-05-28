const Setting = {
    address: 'http://localhost:4000/',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29yZSI6eyJzdW0iOjEwMCwiZGlzdGFuY2UiOjEwLCJncmFkZVBvaW50QXZlcmFnZSI6MjAsInF1b3RhIjo0MCwidGVybSI6MzB9LCJzdGF0dXMiOiIxIiwiaXNVc2VyIjp0cnVlLCJfaWQiOiI2MDMwZGIxNGYzNGNlNjRmMzFjNjU3MDIiLCJyZW50Ijp7InBhaWQiOmZhbHNlfSwiZW1haWwiOiJlaHNhbkByYXljaGF0LmlvIiwidXNlcm5hbWUiOiJlaHNhbiIsInVwZGF0ZWRBdCI6IjIwMjEtMDItMjBUMDk6NDk6MDguMTk3WiIsImNyZWF0ZWRBdCI6IjIwMjEtMDItMjBUMDk6NDk6MDguMTk3WiIsImlhdCI6MTYxNDMzODIyNCwiZXhwIjoxNjE0NDI0NjI0fQ.mGc9ubWtI6mQvLq87GgyK2-q58H0NeW_dJ_FNhKLL7g'
};

function signIn(username, password, url) {
    axios.post(`${Setting.address}signin`, {
        username,
        password
    })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            window.location.href = url;
        })
        .catch(err => console.log(`error : ${err.message}`));
}

function signUp(username, password, email, url) {
    axios.post(`${Setting.address}signup`, {
        username,
        password,
        email
    })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            window.location.href = url;
        })
        .catch(err => alert(`error: ${err.message}`));
}

function getContact() {
    return new Promise((resolve, reject) => {
        axios.get(`${Setting.address}user`)
            .then(res => resolve(res))
            .catch(err => { console.log(err); reject(err.message); });
    });
}

function getMe() {
    return new Promise((resolve, reject) => {
        const token = Setting.token; //localStorage.getItem('token')
        axios.get(`${Setting.address}user/me?token=${token}`)
            .then(res => resolve(res))
            .catch(err => reject(err.message));
    });
}

function updateProfile(data, type = "profile") {
    return new Promise((resolve, reject) => {
        axios({
            method: 'put',
            url: Setting.address.concat('user'),
            data: { ...data, type },
            headers: {
                authorization: Setting.token
            }
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}

function getMessagedsfadasfs(userId) {
    return new Promise((resolve, reject) => {

    });
}

function getConversation(clientId) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: Setting.address.concat(`conversation?clientId=${clientId}`),
            headers: {
                authorization: Setting.token
            }
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}


function createConversation(clientId) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: Setting.address.concat(`conversation`),
            data: { clientId, status: 1 },
            headers: {
                authorization: Setting.token
            }
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}


function getChats(conversationId) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: Setting.address.concat(`chat?conversationId=${conversationId}`),
            headers: {
                authorization: Setting.token
            }
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}

function createChat(message, conversationId) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: Setting.address.concat(`chat`),
            data: {
                message,
                conversationId,
                status: 1,
                type: 1
            },
            headers: {
                authorization: Setting.token
            }
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}