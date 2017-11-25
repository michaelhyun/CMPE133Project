// Dotenv is used to hide credentials by allowing access to credentials
// stored locally.
require('dotenv').config()

// The following contain seed data for nodes in a Firebase database.
// To add more data to seed, edit the files associated with the modules below.
const products = require('./productseed')
var aisles = generateAislesSeed(products)
var clubSavings = generateClubSavings(products)
var promotionalCodes = generatePromotionalCodes(products)

// Initialize firebase-admin to get references to storage and database.
var admin = require('firebase-admin')
var serviceAccount = require(process.env.SERVICE_ACCOUNT_PATH)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.BUCKET_URL
})
var database = admin.database()
var bucket = admin.storage().bucket()

console.log('Seeding database.\n')
// Attempt to seed the database.
seedDataBase().then(
  function(successCallback) { // If seeding succeeded..
    console.log('\nResolved with message: ' + successCallback)
    process.exit()
  }, function(errorCallback) { // If seeding failed..
    console.log('\nRejected with message: ' + errorCallback)
    process.exit()
  }
)

// seedDataBase()
function seedDataBase() {
  // Return a promise so that caller knows if database was successfully seeded or not.
  return new Promise(function (resolve, reject) {
    // Replace all objects in 'products' in database.
    database.ref('products').set(products)
      .then(() => {
        console.log("'products' in Database populated.")
        // Replace all objects in 'savings/clubSavings' in database
        database.ref('savings/club').set(clubSavings)
          .then(() => {
            console.log("'savings/club in Database populated.")
            // Replace all object in 'savings/promotionalCodes in database'
            database.ref('savings/codes').set(promotionalCodes)
              .then(() => {
                console.log("'savings/codes in Database populated.")
                // Replace all objects in 'aisles' in database
                database.ref('aisles').set(aisles)
                  .then(() => {
                    console.log("'aisles' in Database populated.")
                    console.log('Database Populated.')
                    console.log('Populating Storage.')
                    var productImagesSet = false;
                    var aislesImagesSet = false;
                    // Clear out GCS/products
                    bucket.deleteFiles({ prefix: 'products/' })
                      .then(() => {
                        console.log('Deleted all files in GCS/products')
                        var numImages = 0
                        var numImagesTotal = Object.keys(products).length

                        for (var product in products) {
                          uploadImage(product, 'products').then(() => {
                            numImages++
                          })
                        }

                        (function checkIfSeeded() {
                          setTimeout(function () {
                            if(numImages !== numImagesTotal) {
                              console.log('Storage still populating..')
                              checkIfSeeded(numImages)
                            } else {
                              productImagesSet = true
                            }
                          }, 2000)
                        })()
                      }) 
                      .catch((err) => {
                        console.log('Error deleting or populating Storage.')
                        reject(err)
                      })
                    // Clear out GCS/aisles
                    bucket.deleteFiles({ prefix: 'aisles/' })
                      .then(() => {
                        console.log('Deleted all files in GCS/aisles')
                        var numImages = 0
                        var numImagesTotal = Object.keys(aisles).length

                        for (var aisle in aisles) {
                          console.log(aisle)
                          uploadImage(aisle, 'aisles').then(() => {
                            numImages++
                          })
                        }

                        (function checkIfSeeded() {
                          setTimeout(function () {
                            if(numImages !== numImagesTotal) {
                              console.log('Storage still populating..')
                              checkIfSeeded(numImages)
                            } else {
                              aislesImagesSet = true
                            }
                          }, 2000)
                        })()
                      }) 
                      .catch((err) => {
                        console.log('Error deleting or populating Storage.')
                        reject(err)
                      });
                      (function checkIfSeeded() {
                        setTimeout(function () {
                          if(productImagesSet === false || aislesImagesSet === false) {
                            console.log('Storage still populating..')
                            checkIfSeeded()
                          } else {
                            resolve('Database and Storage Populated.')
                          }
                        }, 2000)
                      })()
                  })
                  .catch((err) => {
                    console.log('Error setting "aisles" in Database.')
                    reject(err)
                  })
              })
              .catch((err) => {
                console.log('Error setting "savings/promotionalCodes" in Database.')
                reject(err)
              })
          })
          .catch((err) => {
            console.log('Error setting "savings/clubSavings in Database.')
            reject(err)
          })
      })
      .catch((err) => {
        console.log('Error setting "products" in Database.')
        reject(err)
      })
  })
}

// This function parses a products JSON to generate an aisles JSON
function generateAislesSeed(products) {
  var aisles = {};
  var aisleKeyArray;
  var aisleKey;

  // For every object in products
  for (var product in products) {
    // Check if products owns the object (ie object owns property, otherwise it will enumerate inherited properties)
    // (see: https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript)
    if (products.hasOwnProperty(product)) {
      aisleKeyArray = products[product].aisles
      // For every aisle the product is in
      for (var i = 0; i < aisleKeyArray.length; i++) {
        aisleKey = aisleKeyArray[i]
        if(!aisles.hasOwnProperty(aisleKey))
          aisles[aisleKey] = []
        aisles[aisleKey].push(product)
      }
    }
  }

  return aisles
}


// This function randomly applies club savings to products
// Roughly applies club savings to 20% of all items
function generateClubSavings(products) {
  var clubSavingsProportion = .2
  var maxSavings = .3
  var tempClubSavings = { }
  for (product in products) {
    if(Math.random() < clubSavingsProportion) {
      var clubSavings = Math.floor(products[product].price * (Math.random() * maxSavings) * 10) / 10
      if (clubSavings === 0) {
        clubSavings = .1
      }
      tempClubSavings[product] = clubSavings
    }
  }
  return tempClubSavings
}

// This function randomly generates promotional codes
// TODO: Change product to lowest price of brand before calculating savings
function generatePromotionalCodes(products) {
  var promotionalCodesMax = 20
  var maxQuantity = 3
  var maxSavings = .5
  var tempPromotionalCodes = { }
  var productKeys = Object.keys(products)
  var brandProducts = [ ]
  for (let count = 0; count < promotionalCodesMax; count++) {
    var productKey = productKeys[Math.floor(Math.random() * productKeys.length)]
    var product = products[productKey]
    var integerCode = (Math.floor(Math.random() * 999) + 1).toString()
    integerCode = integerCode.padStart(3, "0")
    var type = Math.floor(Math.random() * 4)

    for (let index = 0; index < productKeys.length; index++) {
      if (products[productKeys[index]].brand === product.brand) {
        brandProducts.push(productKeys[index])
      }
    }

    switch (type) {
      // Buy X of brand, get Y off price
      case 0:
        var code = product.brand.replace(/\s/g,'').slice(0,5).toUpperCase() + integerCode
        var clubSavings = Math.floor(product.price * (Math.random() * maxSavings) * 10) / 10
        if (clubSavings === 0) {
          clubSavings = .5
        }
        var tempPromotionalCode = {
          brand: product.brand,
          type: "brand",
          savings: clubSavings,
          quantity: Math.floor((Math.random() * maxQuantity) + 1)
        }
        break
      // Buy X of brand, get another brand product
      case 1:
        var code = product.brand.replace(/\s/g,'').slice(0,5).toUpperCase() + integerCode
        var tempPromotionalCode = {
          brand: product.brand,
          type: "brand",
          savings: brandProducts[Math.floor(Math.random() * brandProducts.length)],
          quantity: Math.floor((Math.random() * maxQuantity) + 1)
        }
        break
      // Buy X of product, get Y off price
      case 2:
        var code = productKey.replace(/\s/g, '').slice(0,5).toUpperCase() + integerCode
        var clubSavings = Math.floor(product.price * (Math.random() * maxSavings) * 10) / 10
        if (clubSavings === 0) {
          clubSavings = .5
        }
        var tempPromotionalCode = {
          product: productKey,
          type: "product",
          savings: clubSavings,
          quantity: Math.floor((Math.random() * maxQuantity) + 1)
        }
        break
      // Buy X of product, get another of same product (BOGO)
      case 3:
        var code = productKey.replace(/\s/g, '').slice(0,5).toUpperCase() + integerCode
        var tempPromotionalCode = {
          product: productKey,
          type: "product",
          savings: brandProducts[Math.floor(Math.random() * brandProducts.length)],
          quantity: Math.floor((Math.random() * maxQuantity) + 1)
        }
        break
    }
    tempPromotionalCodes[code] = tempPromotionalCode
    brandProducts = [ ]
  }
  return tempPromotionalCodes
}

function uploadImage(key, folder) {
  return new Promise (function (resolve, reject) {
    var seedFilePath = './seed/seed_images/' + key + '.jpg'
    var options = {
      destination: folder + '/' + key + '.jpg'
    }
    bucket.upload(seedFilePath, options, function(err, file, apiResponse) {
      if(err) {
        console.log(err)
        reject(err)
      }
      else {
        console.log('Uploaded "' + key + '.jpg" to storage in "' + folder + '".')
        resolve(file)
      }
    })
  })
}