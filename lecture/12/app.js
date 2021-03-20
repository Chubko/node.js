const dotenv = require('dotenv');
const express = require('express');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '../../.env') });

const db = require('./database/MySQL').getInstance();

db.setModels();

const apiRouter = require('./router/api.router');
const { MONGO_URL, PORT } = require('./config/config');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter); // можна писати app.all

app.use('*', (err, req, res, next) => {
    res
        .status(err.status)
        .json({
            code: err.customCode,
        });
});

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
