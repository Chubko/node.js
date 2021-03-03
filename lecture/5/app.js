const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');
const { MONGO_URL, PORT } = require('./config/config');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter); // можна писати app.all

app.listen(PORT, () => {
    console.log(`App listen port ${PORT}`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', error => {
        console.log(error);
    });
}
