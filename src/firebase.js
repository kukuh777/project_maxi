import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
// require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDefItgO1gWAvLyEcrTJXVlIc7mah71238",
  authDomain: "pwa-maxi.firebaseapp.com",
  databaseURL: "https://pwa-maxi.firebaseio.com",
  projectId: "pwa-maxi",
  storageBucket: "pwa-maxi.appspot.com",
  messagingSenderId: "354499838601",
  appId: "1:354499838601:web:3a4b833410c8db095fbc58",
  measurementId: "G-V93BZTBZXZ"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// const str = firebase.storage();
// const func = firebase.functions();
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
firebase.firestore().enablePersistence({synchronizeTabs:true})

// firebase.firestore().enablePersistence()
//   .catch(function(err) {
//       if (err.code == 'failed-precondition') {
//           // Multiple tabs open, persistence can only be enabled
//           // in one tab at a a time.
//           // ...
//       } else if (err.code == 'unimplemented') {
//           // The current browser does not support all of the
//           // features required to enable persistence
//           // ...
//       }
//   });

export {fb,db}



  
