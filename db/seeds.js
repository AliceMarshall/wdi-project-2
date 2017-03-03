const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Design = require('../models/design');
const User = require('../models/user');

Design.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Alice',
    lastName: 'Marshall',
    image: 'https://avatars3.githubusercontent.com/u/17042311?v=3&s=460',
    username: 'AliceMarshall',
    email: 'marshall.alice92@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Design
      .create([{
        name: 'Classic Bobble Hat',
        technique: '',
        image: '',
        difficulty: 3,
        size: '5mm Circular Needles',
        createdBy: users[0]
      }]);
  })
  .then((designs) => console.log(`${designs.length} designs created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
