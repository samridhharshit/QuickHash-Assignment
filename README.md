# QuickHash Assignment

## Synopsis

A basic web dating app which allows the user to view pictures of other users. Here logged in user can scroll down to
 images of random users except the ones that have blocked them.
 
 Each user can have a single image and  allows a user to like or SuperLike an image. 
 
 If the user likes an image, the beholder of the image will a
 socket io notification that their image is liked by someone while if the user superLikes an image the beholder will
 receive a socket io notification about the user who like their image
 
 ### Tools Used
 1. React, reactstrap and react-bootstrap for frontend.
 2. mySQL database for storing user information.
 3. node.js for handling backend requests.
 4. jwt for authenticating and creating session for a user.
 5. socket.io for sending notifications to/from a user.
 
 ## A working GIF of the App
 
 ![quickhash](https://user-images.githubusercontent.com/39849261/80274192-4c653780-86f6-11ea-8bcd-93bf8a04e844.gif)
 
 ### How to run this app
 1. run `git clone https://github.com/samridhharshit/QuickHash-Assignment.git`
 2. Go to the project directory and run `npm install`
 3. run `npm run dev`
 
 ### END ###