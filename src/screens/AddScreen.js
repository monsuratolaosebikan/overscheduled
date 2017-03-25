/**
 * Created by yifanxing on 3/25/17.
 */
import React, { Component } from 'react';
import {
    Text
} from 'react-native';
export default class AddScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        return <Text>Hello, Navigation!</Text>;
    }
}