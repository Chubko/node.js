// Вам потрібно реалізувати мінімум 5 строрінок.
// 1) Реєстрація
// 2) Логінація.
// 3) Список всіх юзерів.
// 4) Інформація про одного юзера
// 5) Помилка
//
// Створити файл з юзерами, який буде виступати в ролі бази данних.
//
// При реєстрації юзер вводить мейл, нік та пороль і ви його данні дописуєте в файл.
// Але тільки якщо його немає ще. Якшо він є, то видаєте помилку.
// При реєстрації мейли не можуть повторюватись
// Після реєстрації переходите на сторінку зі всіма юзерми.
//
// При логінації юзер так само вводить мейл та пароль і вам необхідно знайти його мейлик в списку юзерів
// та якщо такий мейлик з таким паролем є, то віддати інформацію про юзера.
// В інакшому випадку сказати, що необхідно реєструватись.
//
// І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//

const express = require('express');
const expressHBS = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const app = express();
const port = 5000;
const pathToUsers = path.join(__dirname, 'users.json');
const readFile = promisify(fs.readFile);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHBS({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

let users = [];
const getUsersFromFile = async () => {
    try {
        const usersFromFile = await readFile(pathToUsers);
        users = await JSON.parse(usersFromFile.toString());
    } catch (err) {
        console.log(err.message);
    }
}
getUsersFromFile();


app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', ((req, res) => {
    if (users.some(value => value.email === req.body.email)) {
        res.redirect('/error');
        return;
    }
    users.push(req.body);
    fs.writeFile(pathToUsers, JSON.stringify(users), err => {
        if (err) {
            console.log(err);
        }
    })
    res.redirect('/users',);
}))

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', ((req, res) => {
    if(req.body.email === '' || req.body.password === ''){
        res.redirect('/login');
        return;
    }
    if (users.some(value => value.email === req.body.email && value.password === req.body.password)) {
        const userId = users.findIndex(value => value.email === req.body.email);
        res.redirect(`/users/${userId}`);
        return;
    }
    res.redirect('/register');
}));

app.get('/error', (req, res) => {
    res.render('error');
})
app.get('/users', (req, res) => {
    res.render('users', {users});
})
app.get('/users/:userId', ((req, res) => {
    const {userId} = req.params;
    const user = users[userId];
    res.render('user', {user});
}))


app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})
