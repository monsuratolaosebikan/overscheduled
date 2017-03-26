
import moment from 'moment'

// var calendar = [];


// var sunday = new Date();
// var monday = new Date();
// monday.setDate(sunday.getDate() + 1);

// var task1 = {
//     name: "task1",
//     flexible: true,
//     deadline: monday,
//     estimatedTime: 2
// };

// var schedule = [{
//         name: "task1",
//         flexible: true,
//         deadline: monday,
//         estimatedTime: 2
//     }, {
//         name: "task2",
//         flexible: false,
//         startTime: moment().hours(10).minutes(0).seconds(0).toDate(),
//         endTime: moment({ hour: 13, minute: 10 }).toDate()
//     }, {
//         name: "task3",
//         flexible: true,
//         deadline: monday,
//         estimatedTime: 1
//     },

// ];

// console.log(scheduling(schedule, calendar));


function hasConflict(item, cal) {
    var hasConflict = false;
    cal.forEach(function(i, index) {
        var start = moment(item.deadline).subtract(item.estimatedTime, 'hours');
        if (((start > i.startTime) && (start < i.endTime)) ||
            ((i.startTime > start) && (i.endTime < item.deadline))) {
            hasConflict = true;
        }
    });
    return hasConflict;
}

function getConflictEvent(item, cal) {
    var conflictedEvent = null;
    cal.forEach(function(i, index) {
        var start = moment(item.deadline).subtract(item.estimatedTime, 'hours');
        if (((start > i.startTime) && (start < i.endTime)) ||
            ((i.startTime > start) && (i.endTime < item.deadline))) {
            conflictedEvent = item;
            return conflictedEvent;

        }
    });
    return conflictedEvent;
}


export default function scheduling(list_of_items) {
    var cal = [];
    var flexibleTasks = [];

    list_of_items.forEach(function(task, i) {
        if (task.flexible === false) {
            cal.push({ ...task, startTime: normalize(task.startTime), endTime: normalize(task.endTime) })
        } else {
            flexibleTasks.push(task);
        }
    });

    flexibleTasks.forEach(function(task, i) {
        while (hasConflict(task, cal)) {
            var conflictedTask = getConflictEvent(task, cal);
            var newDeadline = makeStartTime(conflictedTask)
            if (newDeadline < moment()) {
                console.log("You're FLUFED! :P");
                return;
            }
            task.deadline = new Date(newDeadline);
        }
        // conflict resolved
        cal.push({ ...task, startTime: makeStartTime(task).toDate(), endTime: normalize(task.deadline) })

    });

    return cal
}


function normalize(time) {
  return moment(time).toDate();
}

function makeStartTime(task) {
  return moment(task.deadline).subtract(task.estimatedTime, 'hours')
}

