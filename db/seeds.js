const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

// const Design = require('../models/design');
const User = require('../models/user');

// Design.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Alice',
    lastName: 'Marshall',
    // image: 'https://avatars3.githubusercontent.com/u/17042311?v=3&s=460',
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
      }
    ]
  }, {
    firstName: 'Hannah',
    lastName: 'Marshall',
    // image: 'https://avatars3.githubusercontent.com/u/17042311?v=3&s=460',
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

    // const design1 = {
    //   name: 'Classic Bobble Hat',
    //   technique: 'Knitting',
    //   image: 'http://www.picaloulou.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/i/ribbed-hat-olive.jpg',
    //   difficulty: 1,
    //   size: '5mm Circular Needles'
    // };
    // const design2 = {
    //   name: 'Cable Jumper',
    //   technique: 'Knitting',
    //   image: 'http://www.knitya.com/wp-content/uploads/2015/11/cable-knit-jumper-3.jpg',
    //   difficulty: 2,
    //   size: '4.5mm Circular Needles'
    // };

    // console.log(design1);
    // console.log(design2);
    //
    // users[0].designs.push(design1);
    // users[1].designs.push(design2);
    //
    // // console.log(users[0]);
    //
    // users.forEach((user) => {
    //   user.save((err, user) => {
    //     if(err) console.log(err);
    //     console.log(user);
    //     return console.log('User was saved', user);
    //   });
    // });

    // users[1].save();
    // return Design
    //   .create([{
    //     name: 'Classic Bobble Hat',
    //     technique: 'Knitting',
    //     image: 'http://www.picaloulou.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/i/ribbed-hat-olive.jpg',
    //     difficulty: 1,
    //     size: '5mm Circular Needles',
    //     createdBy: users[0]
    //   }, {
    //     name: 'Cable Jumper',
    //     technique: 'Knitting',
    //     image: 'http://www.knitya.com/wp-content/uploads/2015/11/cable-knit-jumper-3.jpg',
    //     difficulty: 2,
    //     size: '4.5mm Circular Needles',
    //     createdBy: users[1]
    //   }]);
  })
  // .then((designs) => console.log(`${designs.length} designs created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
