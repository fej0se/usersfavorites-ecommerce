const express = require("express");
const session = require("express-session")
const { routes } = require('./routes')
const bodyParser = require('body-parser')



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret:'aftersale',
    name:'aftersaleSession',
    saveUninitialized:false,
}));

app.use(routes)


app.listen(3333, () => console.log('server is running'))
