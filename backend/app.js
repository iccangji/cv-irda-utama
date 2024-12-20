const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const appRoute = require('./routes/app.route');
const { httpLogStream } = require('./utils/logger');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());
app.use(cookieParser());
app.use('/', appRoute);

app.use("/api/uploads", express.static(path.join(__dirname, "./uploads")));

module.exports = app;