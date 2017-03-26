import R from 'ramda'
import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Picker, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './styles'
import * as actionCreators from '../../redux/events'
import { shuffle } from '../../redux/app'

const mapStateToProps = ({state}) => ({})
const mapActionsToProps = R.assoc('shuffle', shuffle, R.pick(['submitEvent'])(actionCreators))

export default connect(null, mapActionsToProps)(
class AddScreen extends Component {
  static navigationOptions = {
    title: 'New Task',
  };

  constructor(props) {
    super(props);
    console.log('add', this.props)
    this.state = {
      name: 'lol',
      priority: 3,
      timeBlock: false,
      timeEstimate: null,
      completed: false,
      deadline: new Date().toDateString(),
      isDateTimePickerVisible: false,

    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ deadline: new Date(date).toDateString() });
    this._hideDateTimePicker();
  };

  submit() {
    this.props.submitEvent(this.state);
    this.props.shuffle();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{padding: 10}}>
          <Text style={styles.label}>Name</Text>
          <TextInput
              style={styles.input}
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
          />
          <Text style={styles.label}>Priority</Text>
          <Picker
              selectedValue={this.state.priority}
              onValueChange={(priority) => this.setState({priority})}>
              <Picker.Item label="High" value={1} />
              <Picker.Item label="Medium" value={2} />
              <Picker.Item label="Low" value={3} />
          </Picker>
          <Text style={styles.label}>Start Time</Text>
          <Text style={styles.label}>End Time</Text>
          <Text style={styles.label}>Time Estimate</Text>
          <Text style={styles.label}>Deadline</Text>
              <TouchableOpacity onPress={this._showDateTimePicker}>
                  <Text>{this.state.deadline}</Text>
              </TouchableOpacity>
              <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode="time"
              />

          <Text style={styles.label}>Flexible</Text>
          <Button title="Submit" onPress={() => this.submit()} ></Button>


      </View>
    )
  }
})
