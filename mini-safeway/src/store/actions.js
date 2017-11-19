import { firebase } from '../../firebase'

// This action set's the store's aisles and productNames to the data in Firebase
// Elements in aisles will have the following definition:
//
// {
//   name: String,
//   products: Array
// }
//
export const initializeStoreData = ({ commit, state }) => {
  return new Promise(function (resolve, reject) {
    // Get promocode keys first, then commit
    // TODO: No images associated with promos yet so this is temporary
    firebase.database().ref('savings/codes').once('value')
      .then((data) => {
        if (!data) {
          reject(data)
        }
        const promoCodes = []
        const obj = data.val()
        for (let key in obj) {
          promoCodes.push(key)
        }
        commit('setPromoCodes', promoCodes)
        // Read the data at 'aisles' once (asynchronous)
        firebase.database().ref('aisles').once('value')
          .then((data) => {
            if (!data) {
              reject(data)
            }
            const aisles = []
            const obj = data.val()

            // For every key in the returned data, get the associated image url (asynchronous get), then add it to the local variable aisles
            for (let key in obj) {
              firebase.storage().ref('aisles/' + key + '.jpg').getDownloadURL()
                .then(function (url) {
                  if (!url) {
                    reject(url)
                  }
                  aisles.push({
                    name: key,
                    products: obj[key],
                    imageSrc: url
                  })
                  console.log('Fetched ' + key + ' image from storage')
                })
            }

            // Self-executing, recursive timeout function to ensure that all necessary data has been set to the local variable aisles.
            (function waitUntilPopulated () {
              setTimeout(function () {
                if (Object.keys(aisles).length !== Object.keys(obj).length) {
                  waitUntilPopulated()
                } else {
                  const productNames = []
                  for (let aislesKey in aisles) {
                    for (let productsKey in aisles[aislesKey].products) {
                      if (!(productNames.includes(aisles[aislesKey].products[productsKey]))) {
                        productNames.push(aisles[aislesKey].products[productsKey])
                      }
                    }
                  }
                  commit('setProductNames', productNames)
                  // Local variable aisles has been populated. Set store's aisle to local variable aisle.
                  commit('setAisles', aisles)
                  resolve('Success')
                }
              }, 100)
            })()
          })
      })
  })
}
