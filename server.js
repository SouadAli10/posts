const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))

var db

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


MongoClient.connect('mongodb://blogs:blogs@ds115420.mlab.com:15420/blog', (err, database) => {
    if (err) {
        return err
    }
    db = database.db('blog')
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

app.get('/:sorting?', (req, res) => {
    const sorting = req.params.sorting
    if (!sorting || sorting == "default") {
        db.collection('posts').find().toArray(function (err, results) {
            if (err) return console.log(err)
            res.render('index.ejs', { posts: results })
        })
    } else if (sorting == "title") {
        db.collection('posts').find().sort({ "title": 1 }).toArray(function (err, results) {
            if (err) return console.log(err)
            res.render('index.ejs', { posts: results })
        })
    } else if (sorting == "date") {
        db.collection('posts').find().sort({ "date": -1 }).toArray(function (err, results) {
            if (err) return console.log(err)
            res.render('index.ejs', { posts: results })
        })
    }
})

app.post('/add', (req, res) => {
    db.collection('posts').save(req.body, (err, result) => {
        if (err)
            return console.log(err)
        res.redirect('/')
    })
})

app.all('/edit/:id', (req, res) => {
    const {
        id
    } = req.params

    const _id = ObjectId(decodeURI(id))

    db.collection('posts').findOne({
        _id
    }, function (err, result) {
        if (err)
            return err
        res.render('update.ejs', {
            posts: result
        })
    })
})

app.post('/update/:id', (req, res) => {
    const {
        id
    } = req.params

    const _id = ObjectId(decodeURI(id))

    db.collection('posts').findOneAndUpdate({
        _id: _id
    },
        {
            $set: {
                title: req.body.title,
                text: req.body.text
            }
        }, function (err, result) {
            if (err)
                return err
            res.redirect('/')
        })
})

app.all('/delete/:id', (req, res) => {
    const {
        id
    } = req.params

    const _id = ObjectId(decodeURI(id))

    db.collection('posts').remove({
        _id
    }, function (err, result) {
        if (err)
            return err
        res.redirect('/')
    })
})