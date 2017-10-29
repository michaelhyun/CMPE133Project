// Dotenv is used to hide credentials by allowing access to credentials
// stored locally.
require('dotenv').config();

// The following contain seed data for nodes in a Firebase database.
// To add more data to seed, edit the files associated with the modules below.
const products = require('./productsseed');
const aisles = require('./aislesseed');

// Initialize firebase-admin to reset and populate a Firebase database.
var admin = require("firebase-admin");
var serviceAccount = require(process.env.SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});
var database = admin.database();

console.log("Seeding database.");
// Attempt to seed the database.
seedDataBase(products, aisles, database).then(
  function(successCallback) { // If seeding succeeded..
    console.log(successCallback);
    process.exit();
  }, function(errorCallback) { // If seeding failed..
    console.log(errorCallback);
    process.exit();
  }
);

// seedDataBase(JSON, JSON, Firebase Database Reference)
function seedDataBase(products, aisles, database) {
  // Return a promise so that caller knows if database was successfully seeded or not.
  return new Promise( function (resolve, reject) {
    // Clean out the database.
    database.ref().remove().then(() => { // Attempt to clean database, then..
      // Push all products and corresponding images onto the database.
      for(i = 0; i < Object.keys(products.data).length; i++) {
        this.imageData = {
          "name": products.data[i].name
        };
        database.ref('products').push().set(products.data[i]);
        database.ref('images').push().set(this.imageData);
      }

      // Push all aisles onto the database.
      for(i = 0; i < Object.keys(aisles.data).length; i++) {
        database.ref('aisles').push().set(aisles.data[i]);
      }

      // Must use reference to total products, total aisles, and number of products, images, and aisles in the database since checkIfSeeded() creates local scopes.
      this.numTotalProducts = Object.keys(products.data).length;
      this.numTotalAisles = Object.keys(aisles.data).length;
      this.numProducts = this.numImages = this.numAisles
      var self = this; // Must use closure since 'this' refers to a local scope.
      // checkIfSeeded() is defined in a way that automatically and recursively executes since setTimeout() does not block.
      (function checkIfSeeded(numProducts, numImages, numAisles) {
        setTimeout(function() {
          // Check if number of nodes is equal to number of local seed data.
          if(self.numProducts !== self.numImages !== self.numTotalProducts && self.numAisles !== self.numTotalAisles) { // If not,
            console.log("Database still populating...");
            database.ref('products').once('value')            // then obtain a snapshot of the '/product' node.
              .then(function(snapshot) {                      // When the snapshot of the '/products' node has been fetched,
              self.numProducts = snapshot.numChildren();      // update the number of products in the database.
              database.ref('images').once('value')            // Then obtain a snapshot of the '/images' node.
                .then(function(snapshot) {                    // When the snapshot of the '/images' node has been fetched,
                self.numImages = snapshot.numChildren();      // update the number of images in the database.
                database.ref('aisles').once('value')          // Finally, obtain a snapshot of the '/aisles' node.
                  .then(function(snapshot) {                  // When the snapshot of the '/aisles' node has been fetched,
                  self.numAisles = snapshot.numChildren();    // update the number of aisles in the database.
                  });
                })
              })
          // If the database has been seeded, the promise will resolve and seedDataBase() will return.
          // Otherwise, recursively call checkIfSeeded() to check the database again after 3000 milliseconds (3 seconds).
          checkIfSeeded(self.numProducts, self.numImages, self.numAisles);
          } else {
              // TODO: Add associations between aisles and products, and products and images by setting their corresponding ids before resolving the promise.
              resolve("Database Populated");
          }
        }, 3000);
      })(0, 0, 0);
    }).catch(() => { // If anything goes wrong, reject promise.
      reject("Could not remove database.");
    });
  });
}
