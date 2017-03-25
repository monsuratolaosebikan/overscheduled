import React, { Component } from 'react';
import CalendarScreen from './src/screens/CalendarScreen';
import AddScreen from './src/screens/AddScreen';
import TaskScreen from './src/screens/TaskScreen';
import { StackNavigator } from 'react-navigation';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'task'
        };
    }
    static navigationOptions = {
        title: 'Home',
        header: {
            left: (<Button title="Tasks"
                          onPress={() => this.props.navigation.navigate('Task')}
                  ></Button>),
            right: (<Button title="Add"
                           onPress={() => this.props.navigation.navigate('Add')}
                   ></Button>)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.current === 'calendar' ? <CalendarScreen/> : <TaskScreen/>}
            </View>

        );
    }
}



const overscheduled = StackNavigator({
    Home: { screen: Home },
    Add: { screen: AddScreen },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('overscheduled', () => overscheduled);