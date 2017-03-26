import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import CalendarScreen from './screens/Calendar';
import AddScreen from './screens/Add';
import TaskScreen from './screens/Events';

export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      current: 'calendar'
    };
  }
  static navigationOptions = {
    title(x) {
      console.log(x);
      return 'home';
    },
    header(x) {
      console.log(x);
      return {
        left: (
          <Button title="Tasks" onPress={() => x.navigate('Task') }>  </Button>
        ),
        right: (
          <Button title="Add" onPress={() => x.navigate('Add') }> </Button>
        )
      }
    }
  };

  render() {
    return ( 
      <View> 
      { 
        this.state.current === 'calendar' ? ( 
          < CalendarScreen /> 
        ):( 
          <TaskScreen />
        ) 
      } 
      </View>
    );
  }
}
