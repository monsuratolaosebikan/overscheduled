import R from 'ramda'
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux'

import CalendarScreen from './screens/Calendar';
import AddScreen from './screens/Add';
import TaskScreen from './screens/Events';

import * as actionCreators from './redux/app'
const mapStateToProps = (state) => ({ view: state.app.view })

export default connect(mapStateToProps, actionCreators)(
class Home extends Component {
  static navigationOptions = {
    title({state}) { return state.params && state.params.title },
    header({state, navigate}) {
      return {
        left: (state.params && state.params.left),
        right: (<Button title="Add" onPress={() => navigate('Add') }> </Button>)
      }
    }
  };
  
  titles =  {
    cal: 'Calendar',
    overscheduled: 'Overscheduled',
    events: 'Tasks'
  }
  
  toggle() {
    console.log(this)
    this.props.toggle();
  }
  
  componentDidMount() {
    this.props.navigation.setParams({
      title: 'Home', //this.titles[this.props.view] || 'Home',
      left: (<Button title="Tasks" onPress={() => this.toggle() }>  </Button>)
    })
  }

  // componentWillReceiveProps() {
  //   this.props.navigation.setParams({
  //     ...this.props.navigation.state.params,
  //     title: this.titles[this.props.view] || 'Home'
  //   })
  // }

  render() {
    return ( 
      <View> 
      { 
        this.props.view === 'cal' ? (< CalendarScreen />):
        this.props.view === 'overscheduled' ? (<Text>{'this is overscheduled'}</Text>):
        (<TaskScreen />) 
      } 
      </View>
    );
  }
})
