/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const redis = require('redis');

// Connecting redis package
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const url = require('url');
const csrf = require('csurf');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Maker';

/* Connecting mongoose */
mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to the database');
    throw err;
  }
});

/* Connecting redis */
const client = redis.createClient({
  host: 'redis-16069.c10.us-east-1-2.ec2.cloud.redislabs.com',
  port: 16069,
  password: 'mAEMmm3ROpksD51HJSRtmcvuawrWqcGK',
});

if (process.env.REDISCLOUD_URL) {
  client.host = url.parse(process.env.REDISCLOUD_URL);
  client.password = client.host.auth.split(':')[1];
}

// pull in our routes
const router = require('./router.js');

/* Using express */
const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/peanutFavicon.png`));
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({ client }),
  secret: 'Chicken Nuggets',
  resave: 'true',
  saveUninitialized: true,
  // prevents client side JS from accessing cookies
  cookie: {
    httpOnly: true,
  },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  console.log('Missing CSRF token');
  return false;
});

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
