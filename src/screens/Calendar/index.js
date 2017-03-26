import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, Text, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import Calendar from 'react-native-calendar';
import moment from 'moment'


import styles from './styles';
import * as actionCreators from '../../redux/calendar';

// const mapActionsToProps = R.pluck(['increment', 'decrement'])(actionCreators);
const mapStateToProps = (state) => {
  let props = {
    future: state.app.future,
    present: state.app.present,
    past: state.app.past,
    events: state.events,
    active_date: state.cal.active_date
  }
  
  let active_formatted = moment(props.active_date).format("MMMM Do YYYY");
  let event_list = props.past
    .concat([props.present])
    .concat(props.future)
    .filter(obj => moment(obj.startTime).format("MMMM Do YYYY") ===  active_formatted)
    .map(obj => R.assoc('data', props.events[obj.id], obj))

  return R.assoc('event_list', event_list, props);
};

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const customStyle = {
  weekendDayText: {
    color: 'black',
  },
}




export default connect(mapStateToProps, actionCreators)(
class Schedule extends Component {
  
  renderRow (rowData, sectionID) {
    let format = time => moment(time).format('h:mm a')
    
    return (
       <ListItem
          key={sectionID}
          title={rowData.data.name}
          subtitle={`${format(rowData.startTime)} - ${format(rowData.endTime)}`}

        />
    )
  }

  render () {
    let list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = list.cloneWithRows(this.props.event_list)

    
    return (
      <View style={styles.container}>
        <Calendar
         ref="calendar"
         customStyle={customStyle}
         scrollEnabled
         showControls
         dayHeadings={customDayHeadings}
         monthNames={customMonthNames}
         titleFormat={'MMMM YYYY'}
         onDateSelect={(date) => this.props.setActiveDate(date)}
        />
        <List style={{flex: 1}}>
          <ListView 
            enableEmptySections
            renderRow={this.renderRow}
            dataSource={dataSource}
          />
        </List>
      </View>

    )
  }
  
  
});



//  events={[{date: '2016-07-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
