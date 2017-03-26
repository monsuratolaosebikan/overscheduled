import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';


import store from './store'

import Home from './Home'
import AddScreen from './screens/Add'

const Overscheduled = StackNavigator({
    Home: { screen: Home },
    Add: { screen: AddScreen },
});

function App(props) {
  return (
    <Provider store={store}>
        <Overscheduled />
    </Provider>
  )
}


AppRegistry.registerComponent('overscheduled', () => App);
