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
        console.log(props);
        this.state = {
            current: 'task'
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



/*class App extends Component {
    render() {
        return <Root />;
    }
}

const Root = StackNavigator({
    Calendar: {
        screen: CalendarStack,
    },
    Tasks: {
        screen: TasksStack,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});


AppRegistry.registerComponent('overscheduled', () => App);

    */