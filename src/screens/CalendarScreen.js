/**
 * Created by yifanxing on 3/25/17.
 */
import React, { Component } from 'react';
import {
    Button,
    View,
    Text
} from 'react-native';

export default class CalenderScreen extends Component {
    static navigationOptions = {
        title: 'Calendar',
    };

    render() {
        return (
            <View><Text>Welcom to Calendar!</Text></View>
        );
    }
}