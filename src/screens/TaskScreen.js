/**
 * Created by yifanxing on 3/25/17.
 */
import React, { Component } from 'react';
import {
    Button,
    ListView,
    AppRegistry,
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';


export default class TaskScreen extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'Task 3',
                'Task 4',
                'Task 5',
                'Task 6',
                'Task 7',
                'Task 8'
            ])
        };
    }
    // static navigationOptions = {
    //     title: 'Task',
    // };

    render() {
        return (
            // <Button
            //     onPress={() => this.props.navigation.navigate('Calendar')}
            //     title="Task"
            // />
            //
            <View style={{flex: 1, paddingTop: 22}}>
                <ListView style={blocks.blueBlock}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={blocks.blueBlock}>
                            <Text style={styles.bigblue}>{rowData}</Text>
                        </View>}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigblue: {
        flex: 1,
        padding: 20,
        color: 'cornflowerblue',
        fontWeight: 'bold',
        fontSize: 30
    },
    red: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
    },
});

const blocks = StyleSheet.create({
    blueBlock: {
        flex: 1,
        width: 400,
        backgroundColor: 'powderblue',
        borderBottomColor: 'white',
        borderBottomWidth: 10
    },
    bigBlue: {
        flex: 1,
        backgroundColor: 'steelblue'
    },
    skyBlue: {
        flex: 1,
        backgroundColor: 'skyblue'
    }
});

AppRegistry.registerComponent('ListViewBasics', () => ListViewBasics);