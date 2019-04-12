//import libs
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash')
//import connection to MongoDB and MySQL databases
var { mongoose } = require('../db/config');

//import Mongoose models
var { Todo } = require('../models/todo');

const router = express.Router();

router.use(bodyParser.json());

router.post('/addTodo/', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.body.creator
    });
    console.log (req.body.text,req.body.creator)
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/todoList/:_id', (req, res) => { 
    Todo.find({
        _creator: req.params._id
       
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/todoDetails/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.body.creator
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/deleteTodo/:id/:creator', (req, res) => {
    var id = req.params.id;
    
    Todo.findOneAndRemove({
        _id: req.params.id,
        _creator: req.params.creator
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/updateTodo/:id', (req, res) => {
    var id = req.params.id;
    
    var body = _.pick(req.body, ['text', 'completed']);
    console.log( "testtt",req.params.id,req.body.text)
    /*if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }*/

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ 
        _id: id,
         _creator: req.body.creator
         }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

router.get('/', (req, res) => {
    res.send('From todo route')
})

module.exports = router;