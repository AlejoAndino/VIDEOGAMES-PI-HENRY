const express = require('express');
const app = express();
const router = require('./index');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.use('/', router);


module.exports = app;