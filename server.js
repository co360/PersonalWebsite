const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const okCode = 200;
const notFoundCode = 404;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(helmet.xssFilter());
app.use(helmet.frameguard());

app.use(cookieSession({
    name: 'Sabins cookie',
    maxAge: 60 * 30 * 30 * 24 * 1024,
    keys: ['rwfgjeroigjeroigjergoi']
}))

app.get('/', (request, response) => {
    const requestMethod = request.method;
    const requestURL = request.url;

    if(requestMethod === 'GET' && requestURL.startsWith('/') && request.accepts('html')) {
        return response.status(okCode).sendFile(path.join(__dirname, 'views', 'index.html'));
    }
});

app.get('/personal-projects', (request, response) => {
    const requestMethod = request.method;

    if(requestMethod === 'GET' && request.accepts('html')) {
        return response.status(okCode).sendFile(path.join(__dirname, 'views', 'projects.html'));
    }
});

app.get('/life', (request, response) => {
    const requestMethod = request.method;

    if(requestMethod === 'GET' && request.accepts('html')) {
        return response.status(okCode).sendFile(path.join(__dirname, 'views', 'life.html'));
    }
});

app.use((request, response, next) => {
    const requestMethod = request.method;

    if(requestMethod === 'GET') {
        return response.status(notFoundCode).sendFile(path.join(__dirname, 'views', '404.html'));
    }

    next();
})

app.listen(process.env.PORT || 8040), (error) => {
    if(!error) {
        return console.log('Listening for requests on port 8040');
    }

    else {
        return console.log('Could not listen for requests');
    }
};