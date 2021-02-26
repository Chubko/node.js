const express = require('express');

const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter); // можна писати app.all

app.listen(5000, () => {
    console.log('App listen port 5000');
});
