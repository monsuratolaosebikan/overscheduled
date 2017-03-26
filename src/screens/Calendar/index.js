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
const mapStateToProps = (state) => ({
  future: state.app.future,
  present: state.app.present,
  past: state.app.past,
  events: state.events,
  active_date: state.cal.active_date
});

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
  event_list() {
    let { future, present, past, events, active_date } = this.props;
    let active_formatted = moment(active_date).format("MMMM Do YYYY")
    
    return past.map(R.assoc('past', true))
      .concat([R.assoc('present', true, present)])
      .concat(future.map(R.assoc('future', true)))
      .filter(obj => moment(obj.startTime).format("MMMM Do YYYY") ===  active_formatted)
      .map(obj => R.assoc('data', events[obj.id], obj))
    
  }
  
  renderRow (rowData, sectionID) {
    let format = time => moment(time).format('h:mm a')
    
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={`${format(rowData.startTime)} - ${format(rowData.endTime)}`}
      />
    )
  }

  render () {
    let { future, present, past, events, setActiveDate } = this.props;
    const list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.dataSource = list.cloneWithRows(past)
    
    
    return (
      <View style={styles.container}>
        <Calendar
         ref="calendar"
         style={customStyle}
         scrollEnabled
         showControls
         dayHeadings={customDayHeadings}
         monthNames={customMonthNames}
         titleFormat={'MMMM YYYY'}
         onDateSelect={(date) => setActiveDate(date)}
        />
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.dataSource}
          />
        </List>
      </View>

    )
  }
  
  
});



//  events={[{date: '2016-07-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
