
import firebase from 'firebase';

const config = {
  apiKey : "AIzaSyAXSBUEREBmqSxolYxZDzjg9dzj98rprU0",
  authDomain : "guilloutran-book.firebaseapp.com",
  databaseURL : "https://guilloutran-book.firebaseio.com",
  projectId : "guilloutran-book",
  storageBucket : "guilloutran-book.appspot.com",
  messagingSenderId : "25555383907",
  appId : "1:25555383907:web:cf76833bfe14c6059faa56",
  measurementId : "G-LCMSSKY1WG"
};

const firebaseConf = firebase.initializeApp(config);

export default firebaseConf;