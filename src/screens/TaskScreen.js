/**
 * Created by yifanxing on 3/25/17.
 */
import React, { Component } from 'react';
import {
    Button,
    ListView,
    AppRegistry,
    Text
} from 'react-native';

export default class TaskScreen extends Component {
    static navigationOptions = {
        title: 'Task',
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Calendar')}
                title="Task"
            />
        );
    }
}