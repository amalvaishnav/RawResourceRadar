# RawResourceRadar
Platform to manage and calculate expenses of raw materials

* The goal is to build a Tool where we can manage our Raw material needs and calculate each of their expenses depending upon their Volume and Color. While developing this app, the following aspects are concerned : 
  * Ability to manage Material details and add them as per user's need, available properties are Material Name, color, volume(cubic meters), and cost per cubic meter.
  * Ability to create, update or delete any material added to the app.
  * Ability to come to know the total expense after adding details so that the user can regulate their needs.


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

# Database (in-memory)
* We utilized in-memory `mongodb-memory-server` node module which enables us to manipulate `MongoDB(no-sql)` data in-memory.
* To support MongoDB, we have `Mongoose ODM library` created right for Node apps.
* `Schema/Model` was created to give a structure to our Core data


* Time taken to build the app: 6-7 hours, excluding whenever a crushing error occurred which led me to add coffee breaks

  
  
