const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser').json();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'jira';
const dbName1 = 'mind';
const dbName2 = 'auth';
const client = new MongoClient(url);
const promiseJiraPost = require('./controllers/post');
const promiseJiraSignIn = require('./controllers/post');
const promiseJiraSignUp = require('./controllers/post');
const promiseJiraGet = require('./controllers/get')
const promiseJiraGetCaps = require('./controllers/getWithTrack')
const promiseMindPost = require('./controllers/post');
const promiseMindGet = require('./controllers/get');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "DELETE, PUT, POST, GET");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST, GET");
    // res.body("Access-Control-Allow-preflight", "DELETE, PUT, POST, GET");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/signin', bodyParser, (req, res) => {
    // res.send(req.body.superheros);
    json = req.body;
    // console.table(json)

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName2);

        Promise.resolve().then(promiseJiraPost(db, json)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(() => {
                console.log("Track inserted");
            });
    });
})

app.post('/signup', bodyParser, (req, res) => {
    // res.send(req.body.superheros);
    json = req.body;
    // console.table(json)

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName2);

        Promise.resolve().then(promiseJiraPost(db, json)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(() => {
                console.log("Track inserted");
            });
    });
})

app.post('/post', bodyParser, (req, res) => {
    // res.send(req.body.superheros);
    json = req.body;
    // console.table(json)

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        Promise.resolve().then(promiseJiraPost(db, json)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(() => {
                console.log("Track inserted");
            });
    });
})

app.get('/get', (req, res) => {
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        Promise.resolve().then(promiseJiraGet(db, res)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                // res.send(docs)
                console.log('Tracks data retrieved successfully');
            });
    });
})

app.get('/getcaps', bodyParser, (req, res) => {
    console.log(req.query.track)
    console.log("Connected successfully to server");
    client.connect(function (err) {

        const db = client.db(dbName);

        Promise.resolve().then(promiseJiraGetCaps(db, res, req.query.track)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                // console.log(docs)
                // res.end(docs)
                console.log('Tracks data retrieved successfully');
                // client.close();
            });
    });
})

app.post('/postm', bodyParser, (req, res) => {
    console.table(JSON.stringify(req.body));
    // JSON.stringify(req.body)
    json = req.body;
    console.table(json)

    client.connect(function (err) {
        console.log("Post Connected successfully to server");

        const db = client.db(dbName1);

        Promise.resolve().then(promiseMindPost(db, json)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(() => {
                console.log("Mind inserted");
                res.send(JSON.stringify("Mind inserted"));
            });
    });
})

app.get('/getm', (req, res) => {
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName1);

        Promise.resolve().then(promiseMindGet(db, res)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                // res.send(docs)
                console.log('Mind details retrieved successfully');
            });
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))