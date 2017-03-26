import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, Text } from 'react-native';
import Calendar from './components/Calendar';
import moment from 'moment'


import styles from './styles';
import * as actions from '../../redux/calendar';

const mapActionsToProps = R.pluck(['increment', 'decrement'])(actions);

const mapStateToProps = (state) => ({
  counter: state.counter.number,
  direction: state.counter.previousDirection
});


function Counter({ decrement, increment, value }) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.value}>{value}</Text>


    </View>
  )
}


export default connect()(Counter)
