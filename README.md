# NoSQL Challenge: Social Network API

This project is a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. This application utilizes Express.js for routing, a MongoDB database, and the Mongoose ODM. This application also uses a JavaScript date library for timestamp formatting.

## User Story

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Walkthrough Video
https://github.com/MadDonald/Module-18/assets/100619060/d057e486-2a8c-46c0-b9b8-7cb6de6c5bdc

## Installation & Usage

- Clone this repository to your local machine.
- Run `npm install` to install all necessary packages.
- Create a MongoDB database.
- Enter `npm start` to start the server and sync the Mongoose models to the MongoDB database.
- Use Insomnia to test GET, POST, PUT, and DELETE routes.

## Technologies Used

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
