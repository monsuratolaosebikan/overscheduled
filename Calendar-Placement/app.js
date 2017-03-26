var calendar=[];


var sunday = new Date();
var monday = new Date();
monday.setDate(sunday.getDate() + 1);

var task1 = {name: "task1", 
             flexible: true,
             deadline: monday,
             estimatedTime: 2};

var schedule = [
  {
    name: "task1", 
    flexible: true,
    deadline: monday,
    estimatedTime: 2
  },
    {
    name: "task2", 
    flexible: false,
    startTime: moment().hours(10).minutes(0).seconds(0).toDate(),
    endTime: moment({hour: 13, minute: 10}).toDate()
  },
    {
    name: "task3", 
    flexible: true,
    deadline: monday,
    estimatedTime: 1
  },
    
];

console.log(scheduling(schedule));

    
function hasConflict(item) {
    var hasConflict = false;
    calendar.forEach(function(i, index){
        //var start = item.deadline - item.estimatedTime;
        var start = moment(item.deadline).subtract(item.estimatedTime,'hours');
        if (((start > i.startTime) && (start < i.endTime)) ||
            ((i.startTime > start) && (i.endTime < item.deadline)))
            {
                hasConflict = true;
            }});
    return hasConflict;
}
    
function getConflictEvent(item) {
    var conflictedEvent = null;
    calendar.forEach(function(i, index) {
        //var start = item.deadline - item.estimatedTime;
        var start = moment(item.deadline).subtract(item.estimatedTime,'hours');
        if (((start > i.startTime) && (start < i.endTime)) ||
            ((i.startTime > start) && (i.endTime < item.deadline)))
            {
                conflictedEvent = item;
                return conflictedEvent;
                
            }
            });
    console.log(conflictedEvent);
    return conflictedEvent;
}
    

function scheduling(list_of_items) {
    var flexibleTasks=[];
    list_of_items.forEach(function(task, i) {
        if (task.flexible === false) {
            addToCalendar(task.name, moment(task.startTime), moment(task.endTime));
        } else {
            flexibleTasks.push(task);
        }
    });
    
    flexibleTasks.forEach(function(task, i) {
        while (hasConflict(task)) {
            var conflictedTask = getConflictEvent(task);
            //var newDeadline = conflictedTask.deadline - conflictedTask.estimatedTime;
            var newDeadline = moment(conflictedTask.deadline).subtract(conflictedTask.estimatedTime,'hours');
            //if (newDeadline < Date()) {
            if (newDeadline < moment()) {
                alert("You're FLUFED! :P");
                return;
            }
            task.deadline = new Date(newDeadline);
        }
        // conflict resolved
        //addToCalendar(task.name, task.deadline - task.estimatedTime, task.deadline);
        addToCalendar(task.name,
                      moment(task.deadline).subtract(task.estimatedTime,'hours'), 
                      moment(task.deadline));
    });
    
    calendar = calendar.map(function(x){
            return {
            name: x.name,
            startTime: x.startTime.toDate(),
            endTime: x.endTime.toDate()};    
    });
    
    return calendar;
}

function addToCalendar(name, startTime, endTime) {
    calendar.push({
        name: name,
        startTime: startTime,
        endTime: endTime
    });
}



//psuedo-code:
//
//function schedule(list) {
//    var flexible = [];
//   for each task in list {
//       if(task.flexible === false) {
//           addToCalendar(task);
//       }
//       else {
//           flexible.push(task)
//       }
//   }
//    for task in flexible {
//        if (date < today) {
//            return "overschduled";
//        } else {
//           while (hasConflict(item)) {
//               item.endTime = getConflictEvent(item).startTime;
//           }
//                    addToCalendar();
//        }
//    }
//    return calendar || 'overscheduled'
//}




