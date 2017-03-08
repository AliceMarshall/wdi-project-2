
const request = require('request-promise');

const groupIndex = (req, res, next) => {
  request({
    url: 'https://api.meetup.com/find/groups',
    method: 'GET',
    qs: {
      sign: true,
      location: 'london',
      topic_id: '212,17878',
      page: 150,
      category: 15,
      key: process.env.MEETUP_KEY
    },
    json: true
  })
  .then((data) => {

    const idArray = data.map((group) => {
      console.log(group.id);
      return group.id;
    });

    return request({
      url: 'https://api.meetup.com/2/events',
      method: 'GET',
      qs: {
        group_id: idArray.toString(),
        key: process.env.MEETUP_KEY,
        sign: true,
        page: 150
      },
      json: true
    });
  })
  .then((data) => {
    data.results.forEach((event) => {
      console.log(event.venue);
    });
    res.render('hookup', {data: data.results});
    // res.end();
  })
  .catch(next);
};

module.exports = { groupIndex };
