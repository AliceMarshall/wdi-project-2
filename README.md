#Big Stitch Up

###GA WDI London - Project 2
#####March 2017


A full stack RESTful application, where users can log in and upload their knitting or crochet designs, as a record both for themselves and other users can comment on the designs.

***Check out 'Big Stitch Up'*** [***here***](https://big-stitch-up.herokuapp.com/):

![Image](http://i.imgur.com/MH7X7As.png)

####Approach

Non-logged In users use the Hook Up page to see MeetUp's for knitters and crocheters in their local area, and redirect to the MeetUp website.
There can also see all users and there designs, however cannot comment anything.

Logged In users can create a profile, including upload a profile image. They can also upload an image of their designs and provide details on the needles they used, the technique used and the skill level. All designs are RESTful, and users can comment on their own and others designs.

**Technologies Used**

- JavaScript, Express, MongoDB, Node.js, HTML5, CSS, jQuery were used to create the application.
- Pictures are base64 encoded and stored using the AWS S3 service.
- Authentication uses JWT with Satellizer and BCrypt.
- The Google Web Font 'Dosis' has been used to style the application.
- [***LogoMakr***](https://logomakr.com/) was used to create the sites logo and favicon.

**Copyright &#169;**

I own none of the images or background used in the game. All other work is my own.

####Challenges & Problems
The biggest challenge I had whilst building the application was implementing the MeetUp API. Although the [site](https://www.meetup.com/meetup_api/) was very useful in terms of the variety of methods which couls be used, finding the very niche topics of knitting and crocheting events based on the users location quite difficult. I had to first find the knitting and crochet groups and then make a subsequent request to the MeetUp API for any upcoming events.

I would have liked to have taken the app further and giving more of an incentive to create a profile by being able also upload a pattern of the design but only have it visible if you are also a member of the application.

I would have also liked to implement filters of users, to find a specific user/friend you know who has the app.

**Features & Bugs**

- After a very long struggle, the Facebook login, although working on localhost in development, it does not work when implemented with heroku.
