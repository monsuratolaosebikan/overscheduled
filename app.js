import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import CalendarScreen from './src/screens/Calendar';
import AddScreen from './src/screens/Add';
import TaskScreen from './src/screens/Events';

class Home extends Component {
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
                left: <Button title="Tasks" onPress={() => x.navigate('Task')}></Button>,
                right:<Button title="Add" onPress={() => x.navigate('Add')}></Button>
            }
        }
    };

    render() {
        return (
            <View>
                {this.state.current === 'calendar' ? <CalendarScreen/> : <TaskScreen/>}
            </View>

        );
    }
}



const overscheduled = StackNavigator({
    Home: { screen: Home },
    Add: { screen: AddScreen },
});


 AppRegistry.registerComponent('overscheduled', () => overscheduled);
