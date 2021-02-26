const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const app = express(); //створення серверу

app.use(express.json()); //щоб працював json
app.use(express.urlencoded({extended: true})); //для зчитування різних форматів даних

app.use(express.static(path.join(__dirname, 'static')))//команда для використання статичної папки з загальнодоступною інфою

//-------конфігурація template engine
app.set('view engine', '.hbs')               // встановлення двигуна (який двигун викор.)
app.engine('.hbs', expressHbs(          //опис роботи для відмалювання файлів з розширенням .hbs (що робити, коли зустрічаються файли .hbs)
    {defaultLayout: false}));        //обовязково вказувати, означає відсутність запуску дефолтного файлу
app.set('views', path.join(__dirname, 'static')); //встановлення шляху до статичної папки (де лежать вюшки)
//-------

const users = [];

// app.get('/hello', ((req, res) => {
//     // res.send('world'); // write + end
//     // res.write('world'); //інший спосіб, потрібно зупиняти
//     // res.end();
//
// }))
// app.get('/users', ((req, res) => {
//     res.json([
//         {name: 'ira'},
//         {name: 'ira'},
//         {name: 'ira'},
//         {name: 'iran'},
//         {name: 'ira'}
//     ])
// }))


app.get('/login', (req,res) => {
    res.render('login',{xxx: true, name: 'Andrij'}); //відмальовує файл login.hbs
})
app.post('/login', (req,res) => {
    users.push(req.body);
    // res.json('user is registered'); //записує дані з форми в масив і виводить повідомленняs
    res.redirect('/users');
})
// app.get('/users', (req, res) => {
//     res.render('users', {users}); //відмалювати масив
// })
app.get('/users', (req, res) => {
    const {age}=req.query;
    const filteredUsers = users.filter(value => value.age === 20);
    res.render('users', {users: filteredUsers}); //відмалювати відфільтрований масив
})
app.get('users/:userId', (req, res)=> {
    const {userId} = req.params; //щоб отримати userId
    res.json(users[userId]); //щоб відмалювати конкретного юзера
})


app.listen(5000, ()=>{ //запуск сервера
    console.log('App listen to 5000')
});
