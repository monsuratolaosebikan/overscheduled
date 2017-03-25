import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, Text } from 'react-native';

import styles from './styles';
import { actions } from './ducks';

const mapActionsToProps = R.pluck(['increment', 'decrement'])(actions);

const mapStateToProps = (state) => ({
  counter: state.counter.number,
  direction: state.counter.previousDirection
})


function Counter({ decrement, increment, value }) {
  return (
    <View style={styles.container}>
      <Button
        onPress={decrement}
        title="-"
        accessibilityLabel="Decrease counter value"
      />
      <Text style={styles.value}>{value}</Text>
      <Button
        onPress={increment}
        title="+"
        accessibilityLabel="Increase counter value"
      />
    </View>
  )
}

Counter.navigationOptions = {}

export default connect(mapStateToProps, mapActionsToProps)(Counter)
