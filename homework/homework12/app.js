const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '../../.env') });

const db = require('./database').getInstance();
const cronRun = require('./cron-jobs');

db.setModels();

const { PORT } = require('./configs/config');

const apiRouter = require('./router/api.router');
const logger = require('./logger/winston')();

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    logger.error(JSON.stringify({
        customCode: err.customCode,
        message: err.message,
        status: err.status
    }));

    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`App is working on port ${PORT}`);
    cronRun();
});
