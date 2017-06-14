import React from 'react';
import { StackNavigator } from 'react-navigation';

import App from './app';
import Details from './details';
import Start from './start'

export default const Routing = StackNavigator({
  App: {
    screen: App,
  },
  Details: {
    screen: Details,
  },
});

export default const NoAuth = StackNavigator({
  App: {
    screen: Start,
  },
});
