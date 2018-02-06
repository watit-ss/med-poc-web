'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 8081;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

require('./routes')(app);

app.get('*', (req, res) => { 
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use((err, req, res) => {
    console.log('*******************');
    console.log('* Unhandled error *');
    console.log('*******************');
    console.error(err);
    res.status(500).send({
        message: 'Internal server error'
    });
});

app.listen(PORT, () => console.log(`app start at port ${PORT}`));