/**
 * Index `View`
 * changes:
 * Added the react navigation to the thing and the route names for the navigation
 * Fixed the render function that was using the App module and has been changed to view
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import Start from './src/start';
import App from './src/app';
import Details from './src/details';
import { StackNavigator } from 'react-navigation';
import { Toast } from 'native-base';
var login;

const RootNav = StackNavigator(
  {
    Start: { screen: Start },
    App: { screen: App },
    Details: { screen: Details },
  },
  {
    initialRouteName: 'Start',
  },
);

const RootNavLogged = StackNavigator(
  {
    App: { screen: App },
    Details: { screen: Details },
  },
  {
    initialRouteName: 'App',
  },
);

export default class Places2Meet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('login')
      .then(value => {
        this.setState({ username: value });
      })
      .done();
  }
  render() {
    if (this.state.username !== null) {
      return <RootNavLogged />;
    } else {
      return <RootNav />;
    }
  }
}

AppRegistry.registerComponent('Places2Meet', () => Places2Meet);
