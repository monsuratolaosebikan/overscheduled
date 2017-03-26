import R from 'ramda'
import React, { Component } from 'react';
import { Button, ListView, Text, View } from 'react-native';
import { connect } from 'react-redux'
import moment from 'moment'
import { List, ListItem } from 'react-native-elements'


import styles from './styles'

import * as eventActionCreators from '../../redux/events'
import * as appActionCreators from '../../redux/app'
const mapStateToProps = (state) => ({
  events: state.app.past
    .concat([state.app.present])
    .concat(state.app.future)
    .map(obj => R.assoc('data', state.events[obj.id], obj))
});

export default connect(mapStateToProps, R.pick(['toggle'])(appActionCreators))(
class TaskScreen extends Component {
  static navigationOptions = {
    title: 'Tasks',
  };
  
  constructor(props) {
    super(props);
    const list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      dataSource: list.cloneWithRows(this.props.events)
    };
    console.log(this.state.dataSource);
  }

  render() {
    return (
      <List>
      <ListView
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
      />
      </List>
    );
  }

  renderRow (rowData, sectionID) {
        return (
            <ListItem
                key={sectionID}
                title={rowData.name}
                hideChevron={true}
                containerStyle={styles.item}
            />
        )
    }
})


/*console.log('tasts', this.props);
 return (
 <View style={{flex: 1, paddingTop: 22}}>
 <ListView style={{flex: 1}} dataSource={this.state.dataSource}  renderRow={(rowData) => (
 <View style={styles.blueBlock}>
 <Text>{rowData.id}</Text>
 </View>
 )} />
 </View>
 );*/