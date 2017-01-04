var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://cw:aikido@ds155028.mlab.com:55028/meantodos_udemy_12apps', ['todos']);

//Get Todos
router.get('/', function (req, res, next) {
    db.todos.find(function (err, todos) {
        if(err){
            res.send(err);
        }
        else{
            res.json(todos);
        }

    });
});

//Get Single Todo
router.get('/todo/:id', function (req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, todo) {
            if(err){
                res.send(err);
            }
            else{
                res.json(todo);
            }
    });
});

//Save Todo
router.post('/todo', function (req, res, next) {
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        db.save(todo, function (err, result) {
            if(err){
                res.send(err);
            }
            else{
                res.json(result);
            }
        });
    }

});

//Update ToDo
router.put('/todo/:id', function (req, res, next) {
    var todo = req.body;
    var updatedObj = {};
        if(todo.isCompleted){
          updatedObj.isCompleted = todo.isCompleted;
        }
        if(todo.text){
            updatedObj.text = todo.text;
        }
        if(!updatedObj){
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
        }
        else{
            db.todos.update({
                _id: mongojs.ObjectId(req.params.id)
            }, updatedObj, {}, function (err, result) {
                if(err){
                    res.send(err);
                }
                else{
                    res.json(result);
                }
            });
        }

});

//Delete ToDo
router.delete('/todo/:id', function (req, res, next) {
        db.todos.remove({
            _id: mongojs.ObjectId(req.params.id)
        }, '', function (err, result) {
            if(err){
                res.send(err);
            }
            else{
                res.json(result);
            }
        });
});

module.exports = router;