const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const PORT = 5000;

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`App is working on port ${PORT}`);
});

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = mongoose;
    connection.on('error', err => {
        console.log(err);
    });
}
