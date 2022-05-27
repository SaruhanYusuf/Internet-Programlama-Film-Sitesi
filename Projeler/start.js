// @ts-nocheck
const express = require('express')
const path = require('path')
const title = require('process')
const app = express()
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const PORT = 3000
const connect = require('http2')
const { Router } = require('express')
LocalStrategy = require("passport-local")
passportLocalMongoose = require("passport-local-mongoose")
passport = require("passport")


mongoose.connect('mongodb://127.0.0.1:27017/dpufilmm', {})
app.use(bodyParser.urlencoded({ extended: true }))


app.use(bodyParser.json())
app.post('/userprofile', (req, res) => {


    db.collection('users').findOne(

        {
            $and: [
                { username: req.body.username.toLowerCase() },
                { password: req.body.password }
            ]
        },

        (err, result) => {

            if (err)
            {
                res.status(500).send(err)
                return
            }

            if (!result)
            {
                data = {
                    "meta": {
                        "status": "fail",
                        "message": "Login Failure: Invalid username or password"
                    }
                }
                res.status(401).send(data)
            } else
            {
                data = {
                    "meta": {
                        "status": "success",
                        "message": "Login success"
                    }
                }
                res.render('userprofile')
            }
        })


})


app.get('/login', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    })
    return res.render('login')
})



app.set("view engine", "ejs")
app.use('/css', express.static(path.join(__dirname + "/css")))
app.get("/", (req, res) => {
    res.render("DPUFILM", {
        title: 'DPUFILM',
        nav: ['DPUFILM', 'login', 'hakkimizda']

    })
})


app.get("/DPUFILM", (req, res) => {
    res.render("DPUFILM", {
        title: 'DPUFILM',
        nav: ['DPUFILM', 'login', 'hakkimizda']

    })
})
app.get('/login', (req, res) => {
    res.render("login")
})
app.get('/DEADPOOL', (req, res) => {
    res.render('DEADPOOL')
})

app.get('/hakkimizda', (req, res) =>
    res.render("hakkimizda")
)

app.use(express.static('views'))
var db = mongoose.connection
db.on('error', console.log.bind(console, "connection error"))
db.once('open', function (callback) {
    console.log("connection succeeded")
})
app.post('/register', function (req, res) {
    var username = req.body.username
    var password = req.body.password


    var data = {
        "username": username,
        "password": password,

    }
    db.collection('users').insertOne(data, function (err, collection) {
        if (err) throw err
        console.log("Record inserted Successfully")

    })

    return res.render('userprofile')
})


app.get('/register', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    })
    return res.render('register')
}).listen(3000)


console.log("server listening at port 3000")
