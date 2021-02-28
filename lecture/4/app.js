const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter); // можна писати app.all

app.listen(5000, () => {
    console.log('App listen port 5000');
});

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', error => {
        console.log(error);
    });
}
