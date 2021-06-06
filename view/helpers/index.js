const Setting = {
  address: 'http://localhost:3000/',
  // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29yZSI6eyJzdW0iOjEwMCwiZGlzdGFuY2UiOjEwLCJncmFkZVBvaW50QXZlcmFnZSI6MjAsInF1b3RhIjo0MCwidGVybSI6MzB9LCJzdGF0dXMiOiIxIiwiaXNVc2VyIjp0cnVlLCJfaWQiOiI2MDMwZGIxNGYzNGNlNjRmMzFjNjU3MDIiLCJyZW50Ijp7InBhaWQiOmZhbHNlfSwiZW1haWwiOiJlaHNhbkByYXljaGF0LmlvIiwidXNlcm5hbWUiOiJlaHNhbiIsInVwZGF0ZWRBdCI6IjIwMjEtMDItMjBUMDk6NDk6MDguMTk3WiIsImNyZWF0ZWRBdCI6IjIwMjEtMDItMjBUMDk6NDk6MDguMTk3WiIsImlhdCI6MTYxNDMzODIyNCwiZXhwIjoxNjE0NDI0NjI0fQ.mGc9ubWtI6mQvLq87GgyK2-q58H0NeW_dJ_FNhKLL7g'
  token: localStorage.getItem('token')
};

async function findUser(id) {
  return await axios.get(Setting.address.concat(`authorization/${id}`));
}

function signIn(email, password, url) {
  axios.post(Setting.address.concat('authorization/signin'), {
    email,
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

// categories
async function getCategory() {
  try {
    return await axios.get(`${Setting.address}category/find`);
  } catch (err) {
    console.log(err);
    alert('خطا در دریافت دسته بندی ها');
  }
}

async function createCategory(name) {
  try {
    return await axios.post(
      Setting.address.concat('category/create'),
      { name },
      {
        headers: {
          authorization: Setting.token
        }
      }
    );
  } catch (err) {
    console.log(err);
    alert('خطا در ایجاد دسته بندی');
  }
}

async function removeCategory(id) {
  try {
    await axios.delete(
      Setting.address.concat(`category/delete/${id}`),
      {},
      {
        headers: { authorization: Setting.token }
      }
    );
    alert('دسته بندی با موفقیت حذف شد');
    window.location.reload();

  } catch (err) {
    console.log(err);
    alert('خطایی در حذف دسته بندی');
  }
}

// cities
async function getCity() {
  try {
    return await axios.get(Setting.address.concat('city/find'));
  } catch (err) {
    console.log(err);
    alert('خطا در دریافت شهر ها');
  }
}

async function createCity(name) {
  try {
    return await axios.post(
      Setting.address.concat('city/create'),
      { name },
      {
        headers: {
          authorization: Setting.token
        }
      }
    );
  } catch (err) {
    console.log(err);
    alert('خطا در ایجاد شهر ها');
  }
}

async function removeCity(id) {
  try {
    await axios.delete(
      Setting.address.concat(`city/delete/${id}`),
      {},
      {
        headers: { authorization: Setting.token }
      }
    );
    alert('شهر با موفقیت حذف شد');
    window.location.reload();

  } catch (err) {
    console.log(err);
    alert('خطایی در حذف شهر');
  }
}

// products
async function getProduct(params = {}) {
  try {
    return await axios.get(Setting.address.concat('product/find'), { params });
  } catch (err) {
    console.log(err);
    alert('خطا در دریافت آگهی ها');
  }
}

async function createProduct(title, description, categoryId, cityId, type, price, files = []) {
  try {
    await axios.post(
      Setting.address.concat('product/create'),
      { title, description, categoryId, cityId, files, type, price },
      {
        headers: {
          authorization: Setting.token
        }
      }
    );
    alert('آگهی با موفقیت ایجاد شد');
    window.location.reload();
  } catch (err) {
    console.log(err);
    alert('خطا در ایجاد آگهی ها');
  }
}

async function removeProduct(id) {
  try {
    await axios.delete(
      Setting.address.concat(`product/delete/${id}`),
      {},
      {
        headers: { authorization: Setting.token }
      }
    );
    alert('آگهی با موفقیت حذف شد');
    window.location.reload();

  } catch (err) {
    console.log(err);
    alert('خطایی در حذف آگهی');
  }
}
async function updateProductTop(id) {
  try {
    await axios.put(
      Setting.address.concat(`product/update/${id}`),
      { status: 1, onTop: true },
      {
        headers: { authorization: Setting.token }
      }
    );
    alert('حالت نردبان فعال شد');
    window.location.reload();

  } catch (err) {
    console.log(err);
    alert('خطایی در فعال سازی حالت نردبان');
  }
}
async function updateProduct(id) {
  try {
    await axios.put(
      Setting.address.concat(`product/update/${id}`),
      { status: 1 },
      {
        headers: { authorization: Setting.token }
      }
    );
    alert('آگهی با موفقیت تایید شد');
    window.location.reload();

  } catch (err) {
    console.log(err);
    alert('خطایی در تایید آگهی');
  }
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
