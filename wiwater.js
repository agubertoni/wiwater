WaterSensors = new Mongo.Collection('sensors');
Circles = new Meteor.Collection('circles');

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Circles.find().count() === 0) {
            Circles.insert({data: [5, 8, 11, 14, 17, 20]});
        }
    });
    Meteor.setInterval(function () {
        var newData = _.shuffle(Circles.findOne().data);
        Circles.update({}, {data: newData});
    }, 2000);
}

if (Meteor.isClient) {

    Template.sensorslist.helpers({
        'showSensor': function () {
            return WaterSensors.find()
        },
        'countSensors': function () {
            return WaterSensors.find().count()
        },
        'selectedClass': function () {
            return "active"
        }
    });

    Template.sensorslist.events({
        'change': function () {
            console.log("change")
        },
        'click li.sensor': function () {
            var sensorId = this._id
            console.log(sensorId)
        }
    });

    Template.vis.rendered = function () {

        var ctx = document.getElementById("myChart").getContext("2d");

        //var f1 = WaterSensors.find({},{fields:{node:1,flow:1},sort:{node:1}}).fetch();
        //var f1 = WaterSensors.findOne({'node':1}).flow;
        //var f2 = f1[0].flow;
        //var f3 = f1[1].flow;

        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [65, 20]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48]
                }
            ]
        };

        var myBarChart = new Chart(ctx).Bar(data, {
            barShowStroke: false
        });





        WaterSensors.find().observe({
            added: function () {
                myBarChart;
            },
            changed: function () {
                myBarChart;
            }
        });


    }; //end rendered


}



