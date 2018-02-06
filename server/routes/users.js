'use strict';

const express = require('express');
const _ = require('lodash');
const moment = require('moment');

const users = require('../models/users');

const router = express.Router();

router.get('/', (req, res, next) => {
    return res.send({
        data: users
    });
});

router.get('/:id', (req, res, next) => {
    const id = +req.params.id;
    const user = _.find(users, u => u.id === id);
    if (user) {
        res.send({
            data: user
        });
    } else {
        res.status(400).send({
            message: 'USER NOT FOUND'
        });
    }
});

router.post('/', (req, res, next) => {
    const model = req.body;
    const id = _.maxBy(users, u => u.id).id + 1;
    const user = {
        ...model,
        id,
        createdAt: moment().unix(),
        updatedAt: moment().unix()
    };
    users.push(user);
    res.send({
        data: user
    });
});

router.put('/:id', (req, res, next) => {
    const id = +req.params.id;
    const model = req.body;
    const index = _.findIndex(users, u => u.id === id);
    if (index > -1) {
        const user = {
            ...users[index],
            ...model,
            updatedAt: moment().unix()
        };
        users[index] = user;
        res.send({
            data: user
        });
    } else {
        res.status(400).send({
            message: 'USER  NOT FOUND'
        });
    }
});

router.delete('/:id', (req, res, next) => {
    const id = +req.params.id;
    const index = _.findIndex(users, u => u.id === id);
    if (index > -1) {
        _.remove(users, u => u.id === id);
        res.send({
            data: 'OK'
        });
    } else {
        res.status(400).send({
            message: 'USER NOT FOUND'
        });
    }
});

module.exports = router;