const express = require('express');
const router = express.Router();
const db = require('../models');



router.get('/search', (req, res) => {
// db.Post.find({content: new RegExp(req.query.q, 'i')}, (err, allPosts) => {
db.Post.find({content: new RegExp(req.query.q, 'i')})

// db.Post.find({query:req.query.id})   
.populate('users')
.populate('cities') 
.exec((err, allPosts) => {
    if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});

    // res.json({query:req.query.id,status: 200, message: 'Success', data: allPosts});
    // res.json({content: new RegExp(req.query.q, 'i'),status: 200, message: 'Success', data: allPosts});
    res.json({content: req.query.q ,status: 200, message: 'Success', data: allPosts});
})
});



// ----
router.get('/userposts/:userId', (req, res) => {
    db.Post.find({user: req.params.userId})
        .populate('users')
        .populate('cities')
        .exec((err, allPosts) => {
            if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});
            res.json({status: 200, message: 'Success', data: allPosts});
        })
    })

// -----
router.get('/cityposts/:cityId', (req, res) => {
    db.Post.find({city: req.params.cityId})
        .populate('users')
        .populate('cities')
        .exec((err, allPosts) => {
            if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});
            res.json({status: 200, message: 'Success', data: allPosts});
        })
    });

// index
router.get('/', (req, res) => {
    db.Post.find({})
        .populate('users')
        .populate('cities')
        .exec((err, allPosts) => {
            if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});

            res.json({status: 200, message: 'Success', data: allPosts});
        })
    });

router.get('/:id', (req, res) => {
    db.Post.findById(req.params.id)
        .populate('users')
        .populate('cities') 
        .exec((err, foundPost) => {
            if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});

            res.json({status: 200, message: 'Success', data: foundPost});
        });
    });

router.post('/', (req, res) => {
    db.Post.create(req.body, (err, newPost) => {
        if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});
        res.json({status: 200, message: 'Success', data: newPost});
        });
    });

router.put("/:id", (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
        if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});
        res.json({status: 200, message: 'Success', data: updatedPost});
        });
    });

router.delete('/:id', (req, res) => {
    db.Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        if (err) return res.status(500).json({status: 500, error: 'Something went wrong, please try again'});
        res.json({status: 200, message: 'Success', data: deletedPost});
        });
    });



module.exports = router;