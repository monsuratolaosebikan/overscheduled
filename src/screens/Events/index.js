/**
 * Created by yifanxing on 3/25/17.
 */
import React, { Component } from 'react';

export default class TaskScreen extends Component {
    static navigationOptions = {
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Calendar')}
                title="Go to Calendar"
            />
        );
    }
}