import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDY8eaiPOZ_SVzKaqBm3D8yC8QKUsnUeBk",
    authDomain: "mini-safeway-cmpe133-cloud8.firebaseapp.com",
    databaseURL: "https://mini-safeway-cmpe133-cloud8.firebaseio.com",
    projectId: "mini-safeway-cmpe133-cloud8",
    storageBucket: "mini-safeway-cmpe133-cloud8.appspot.com",
    messagingSenderId: "320781320502"
}

const firebaseApp = Firebase.initializeApp(config)

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
