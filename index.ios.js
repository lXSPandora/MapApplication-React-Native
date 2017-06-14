/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/app';
import Details from './src/details';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBpSEuxpv7nIPjv2Df8Xcq6dS9c2LYzELo",
  authDomain: "",
  databaseURL: "https://places2meet.firebaseio.com/",
  storageBucket: "gs://places2meet.appspot.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Places2Meet extends Component {
  render() {
    return (
      <App />
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: App  },
  Details: { screen: Details }
});

AppRegistry.registerComponent('Places2Meet', () => SimpleApp);
