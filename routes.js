var express = require('express');
var router = express.Router();


//GET /questions
//route for all questions
router.get('/', function(req, res){
    
    res.json({response: 'some response'});
    
});

//POST /questions
//route for creating questions
router.post('/', function(req, res){
    res.json({
        response: 'this is a post',
        body: req.body
    });
});

//GET /questions/:id
//route for specific questions
router.get('/:qid', function(req, res){
    res.json({
        response: 'you sent a get to' + req.params.qid
    });
});

//POST /questions/:id/answers
//route for creating an answer
router.post('/:qid/answers', function(req, res){
    res.json({
        response: 'you send me a post questions + ' + req.params.qid,
        questionId: req.params.qid,
        body: req.body
    });
});

//PUT /questions/:id/answers/:aid
//route for editing an answer
router.put('/:qid/answers/:aid', function(req, res){
    res.json({
        response: 'you send me a put questions + ' + req.params.qid + req.params.aid,
        questionId: req.params.qid,
        answerId: req.params.aid,
        body: req.body
    });
});

//DELETE /questions/:id/answers/:aid
//route for deleting an answer
router.delete('/:qid/answers/:aid', function(req, res){
    res.json({
        response: 'you send me a delete questions + ' + req.params.qid + req.params.aid,
        questionId: req.params.qid,
        answerId: req.params.aid,
    });
});


//POST /questions/:id/answers/:aid/vote-:dir
//route for up and down vote, first callback is a validation
router.post('/:qid/answers/:aid/vote-:dir', function(req, res, next){
        if(req.params.dir.search(/^(up|down)$/) === -1){
            var err = new Error('not found');
            err.status = 404;
            next(err);
        } else{ //checks for up/down otherwise triggers the next route handler below
            next();
        }
    }, function(req, res){
    res.json({
        response: 'you send me a post questions + ' + req.params.qid + req.params.aid + req.params.dir,
        questionId: req.params.qid,
        answerId: req.params.aid,
        vote: req.params.dir
    });
});

module.exports = router;