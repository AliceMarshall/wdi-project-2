const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');

User.collection.drop();

User
  .create([{
    firstName: 'Alice',
    lastName: 'Marshall',
    profileImage: 'https://avatars3.githubusercontent.com/u/17042311?v=3&s=460',
    username: 'AliceMarshall',
    email: 'marshall.alice92@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    designs: [
      {
        name: 'Classic Bobble Hat',
        technique: 'Knitting',
        image: 'http://www.picaloulou.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/i/ribbed-hat-olive.jpg',
        difficulty: 1,
        size: '5mm Circular Needles'
      }, {
        name: 'Cable Jumper',
        technique: 'Knitting',
        image: 'http://www.knitya.com/wp-content/uploads/2015/11/cable-knit-jumper-3.jpg',
        difficulty: 2,
        size: '4.5mm Circular Needles'
      }
    ]
  }, {
    firstName: 'Hannah',
    lastName: 'Marshall',
    profileImage: 'https://scontent.xx.fbcdn.net/v/t1.0-9/14192071_10157521154220151_3305327912080496122_n.jpg?oh=5852027876fada12c8a375153812be53&oe=5931C8F8',
    username: 'HannahMarshall',
    email: 'han@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    designs: [
      {
        name: 'Cable Jumper',
        technique: 'Knitting',
        image: 'http://www.knitya.com/wp-content/uploads/2015/11/cable-knit-jumper-3.jpg',
        difficulty: 2,
        size: '4.5mm Circular Needles'
      }
    ]
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
