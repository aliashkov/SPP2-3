import * as express from 'express';
import * as morgan from 'morgan';
import * as emperorsRouter from './src/api/emperors';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as passportJWT from 'passport-jwt';
import * as passport from 'passport';

import * as _ from 'lodash';

const app = express();
app.use(express.json());
app.use(morgan('combined'));
const port = 3001;

app.use('/emperors', emperorsRouter);

const  ExtractJwt = passportJWT.ExtractJwt;
const  JwtStrategy = passportJWT.Strategy;

const users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey : 'tasmanianDevil' };

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  const user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({message: 'Express is up!'});
});

app.post('/login', (req, res) => {
  const name = 'test';
  if (req.body.password) {
     const password = req.body.password;
  }
  // usually this would be a database call:
  const user = users[_.findIndex(users, {name: name})];
  if ( ! user ) {
    res.status(401).json({message: 'no such user found'});
  }

  if (user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = {id: user.id};
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: 'ok', token: token});
  } else {
    res.status(401).json({message: 'passwords did not match'});
  }
});



app.listen(port, () => {
    console.log(`Ready! Express running on port ${port}.`);
});
