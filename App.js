import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {myStore} from './src/action/store/Store';
import Navigate from './src/navigation/Navigate';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt_jkbxiYpnrscLHa_bVqeaRgwZBYVcjU",
  authDomain: "chatedemo-19c1d.firebaseapp.com",
  databaseURL: "https://chatedemo-19c1d-default-rtdb.firebaseio.com",
  projectId: "chatedemo-19c1d",
  storageBucket: "chatedemo-19c1d.appspot.com",
  messagingSenderId: "798564766973",
  appId: "1:798564766973:web:48436f88ff5c2246925a94",
  measurementId: "G-L2WY6WBQ4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const App = () => {
  return (
    <Provider store={myStore}>
      <Navigate />
    </Provider>
  );
};

export default App;
