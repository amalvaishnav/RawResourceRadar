# RawResourceRadar
Platform to manage and calculate expenses of raw materials

* The goal is to build a Tool where we can manage our Raw material needs and calculate each of their expenses depending upon their Volume and Color. While developing this app, the following aspects are concerned : 
  * Ability to manage Material details and add them as per user's need, available properties are Material Name, color, volume(cubic meters), and cost per cubic meter.
  * Ability to create, update or delete any material added to the app.
  * Ability to come to know the total expense after adding details so that the user can regulate their needs.

# Assumptions made about the nature of the App
* Building a form where Resource `Name, color, volume, and Cost` inputs are given. 
* When `Create` or `Update`button is hit, it should provide validations for each field there and shouldn't let an invalid input go through.
* ID is the unique element available for each record, which gets allocated when the form entry is successfully submitted, then utilized throughout the app to manage CRUD Operations.
* Upon Creating the record, it should add that record in the list visible on the left with the Color and Volume entered by the user.
* Clicking each record will let the user go into the form and edit/delete that record.
* Total Cost mentioned at the end, the formula used is: Total of each (Resource Volume * Resource Cost). 
* The `Date` component I realized at the end and the time frame won't allow me to add that hence intentionally left that field.

# How to Run the app

* Steps
    * After cloning this repository, do `cd raw-resource-radar` to enter into the directory.
    * Make sure Node and NPM modules are installed locally.
    * Run `npm install`
    * After installation is done for all required dependencies above, run `npm start` to start the client. The port supported is `http://localhost:3000`. Notice it's not HTTP Secured
 
    * Now we need to start the server meant to support REST API calls, to do that, on a separate command line window go to the following path from the root of the directory raw-resource-radar by this command: `cd src/server`
    * Start the server by hitting the command `node server.js`, now we are able to listen to the server on the `http://localhost:5001` port.  Notice it's not HTTP Secured.
    * Finally, Open the browser and go to `http://localhost:3000` where we'll be able to see the application


# Tech stack used building the app: MERN Stack
 * MongoDb In-memory Database
 * Express Server
 * React to create a Front end Component
 * Node.js in the backend 

# Front-end
* Mainly used React.JS to build components on the Front end while building Components.
* Utilized core concepts for Functional React like `useEffect, useState, useContext` and `props`.
* Provided `CSS` and used `Flex` to organize compartments

# Back-end
* REST-API server was written using `Node.js and Express` where routes were written(src/routes.js) to support Reading, Creating, Updating and Removing entries from the in-memory Database.
* To make that happen we used fundamental REST principals GET(to read), POST(to submit), PUT(to update) and DELETE(to delete) to manipulate data.

# APIs
* GET http://localhost:5001/data
* POST http://localhost:5001/data
  * Body {
    "name":"56776",
    "color":"56fg",
    "vol": 3434,
    "cost": 0.5
    }
 * PUT http://localhost:5001/:id
    * Body {
       "name":"56776",
       "color":"56fg",
       "vol": 3434,
       "cost": 0.5
       }
 * DELETE http://localhost:5001/:id

# Database (in-memory)
* We utilized in-memory `mongodb-memory-server` node module which enables us to manipulate `MongoDB(no-sql)` data in-memory.
* To support MongoDB, we have `Mongoose ODM library` created right for Node apps.
* `Schema/Model` was created to give a structure to our Core data

# Scope of Improvement
* Add Unit tests for the Front end and Backend
* Add a Security layer, be it OAuth or JWT or add a basic MD5 to mask data
* Date picker to add delivery date for Resource Material data

# Challenges and Learnings
* Tackling API requests whilst maintaining the correct flow of data.
* Understanding Color picker with hex values talking the API

# Screen recording
https://github.com/amalvaishnav/RawResourceRadar/assets/30755600/07e43389-603e-4e94-ae76-f3c9fee4e298



* Time taken to build the app: 6-7 hours, excluding whenever a crushing error occurred which led me to add coffee breaks

  
  
