import R from 'ramda'
import React, { Component } from 'react';
import {  ScrollView, View, TextInput, StyleSheet, Picker, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
    FormLabel,
    FormInput,
    CheckBox,
    Button,
    Text
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { connect } from 'react-redux'
import moment from 'moment'

import styles from './styles'
import * as actionCreators from '../../redux/events'
import { shuffle } from '../../redux/app'

const mapStateToProps = ({state}) => ({});
const mapActionsToProps = R.assoc('shuffle', shuffle, R.pick(['submitEvent'])(actionCreators))

export default connect(null, mapActionsToProps)(
class AddScreen extends Component {
  static navigationOptions = {
    title: 'New Task',
  };

  constructor(props) {
    super(props);
    console.log('add', this.props);
    this.state = {
      name: null,
      timeBlock: false,
      timeEstimate: null,
      completed: false,
      deadline: new Date().toDateString(),
      startTime: null,
      endTime: null,
      isDateTimePickerVisible: false,
    }
  }

  render() {
    return (
        <ScrollView style={{backgroundColor: 'white', flex:1}} keyboardShouldPersistTaps="always">
            <FormLabel
                containerStyle={styles.labelContainerStyle}>Name</FormLabel>
            <FormInput onChangeText={(name) => this.setState({name})}/>
            <CheckBox
                title='Flexible'
                checked={this.state.timeBlock}
                onPress={() => this.changeFlexibleStatus()}
            />
            <FormLabel containerStyle={styles.labelContainerStyle}>Start Time</FormLabel>
            <TouchableOpacity onPress={this.showStartTimePicker}>
                <Text style={styles.dateTime}>{this.state.startTime ? moment(this.state.startTime).format("h:mm a") : 'Select start time'}</Text>
            </TouchableOpacity>
            <DateTimePicker
                isVisible={this.state.isStartTimePickerVisible}
                onConfirm={this.handleStartTimePicked}
                onCancel={this.hideStartTimePicker}
                mode="time"
            />
            <FormLabel containerStyle={styles.labelContainerStyle}>End Time</FormLabel>
            <TouchableOpacity onPress={this.showEndTimePicker}>
                <Text style={styles.dateTime}>{this.state.endTime ? moment(this.state.endTime).format("h:mm a") : 'Select end time'}</Text>
            </TouchableOpacity>
            <DateTimePicker
                isVisible={this.state.isEndTimePickerVisible}
                onConfirm={this.handleEndTimePicked}
                onCancel={this.hideEndTimePicker}
                mode="time"
            />
            <FormLabel containerStyle={styles.labelContainerStyle}>Time Estimate</FormLabel>
            <FormInput onChangeText={(timeEstimate) => this.setState({timeEstimate})}/>
            <FormLabel containerStyle={styles.labelContainerStyle}>Date or Deadline</FormLabel>
            <TouchableOpacity onPress={this.showDeadlineDatePicker}>
                <Text style={styles.dateTime}>{this.state.deadline? moment(this.state.deadline).format("ddd, MMMM Do YYYY"): 'Select date'}</Text>
            </TouchableOpacity>
            <DateTimePicker
                isVisible={this.state.isDeadlineDatePickerVisible}
                onConfirm={this.handleDeadlineDatePicked}
                onCancel={this.hideDeadlineDatePicker}
                mode="date"
            />
            <Button
                onPress={() => this.submit()}
                buttonStyle={{marginTop: 15}}
                title='SUBMIT' />
        </ScrollView>
    )
  }

  changeFlexibleStatus() {
      let status = this.state.timeBlock;
      this.setState({timeBlock:!status});
  }

    submit() {
        this.props.submitEvent(this.state);
        this.props.shuffle();
        this.props.navigation.goBack();
    }

    showStartTimePicker = () => this.setState({ isStartTimePickerVisible: true });

    hideStartTimePicker = () => this.setState({ isStartTimePickerVisible: false });

    handleStartTimePicked = (date) => {
        this.setState({ startTime: new Date(date) });
        this.hideStartTimePicker();
    };

    showEndTimePicker = () => this.setState({ isEndTimePickerVisible: true });

    hideEndTimePicker = () => this.setState({ isEndTimePickerVisible: false });

    handleEndTimePicked = (date) => {
        this.setState({ endTime: new Date(date) });
        this.hideEndTimePicker();
    };

    showDeadlineDatePicker = () => this.setState({ isDeadlineDatePickerVisible: true });

    hideDeadlineDatePicker = () => this.setState({ isDeadlineDatePickerVisible: false });

    handleDeadlineDatePicked = (date) => {
        this.setState({ deadline: new Date(date) });
        this.hideDeadlineDatePicker();
    };

})


