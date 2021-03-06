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
        name: 'Knitted Gloves',
        technique: 'Knitting',
        image: 'https://images.pexels.com/photos/63448/pexels-photo-63448.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        difficulty: 'Intermediate',
        size: '3mm Needles'
      }, {
        name: 'Handbag',
        technique: 'Crochet',
        image: 'https://cdn.pixabay.com/photo/2016/06/25/16/23/bag-1479215_960_720.jpg',
        difficulty: 'Intermediate',
        size: '6mm Hook'
      }
    ]
  // }, {
  //   firstName: 'Sarah',
  //   lastName: 'Towers',
  //   profileImage: 'https://scontent.xx.fbcdn.net/v/t1.0-9/13177265_1243070935711042_6754585434974686438_n.jpg?oh=15970e84636420d969e95b6599d89a4c&oe=59639293',
  //   username: 'SarahTowers',
  //   email: 'sarah@gmail.com',
  //   password: 'password',
  //   passwordConfirmation: 'password',
  //   designs: [
  //     {
  //       name: 'Cable Jumper',
  //       technique: 'Knitting',
  //       image: 'http://www.knitya.com/wp-content/uploads/2015/11/cable-knit-jumper-3.jpg',
  //       difficulty: 'Intermediate',
  //       size: '4.5mm Circular Needles'
  //     }
  //   ]
  // }, {
  //   firstName: 'Hayden',
  //   lastName: 'Crosweller',
  //   profileImage: 'https://scontent.xx.fbcdn.net/v/t31.0-8/13497713_10201872763978802_4059869018508169133_o.jpg?oh=fb95b5a203c19d759f72dce14ac12a28&oe=592E494D',
  //   username: 'IAmHayden',
  //   email: 'hayden@gmail.com',
  //   password: 'password',
  //   passwordConfirmation: 'password',
  //   designs: [
  //     {
  //       name: 'Cable Jumper',
  //       technique: 'Knitting',
  //       image: 'http://www.knitya.com/wp-content/uploads/2015/11/cable-knit-jumper-3.jpg',
  //       difficulty: 'Intermediate',
  //       size: '4.5mm Circular Needles'
  //     }
  //   ]
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
