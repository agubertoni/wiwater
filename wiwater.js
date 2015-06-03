WaterSensors = new Mongo.Collection('sensors');

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (WaterSensors.find().count() === 0) {
            WaterSensors.insert({'node':1, 'flow':1});
            WaterSensors.insert({'node':2, 'flow':2});
        }
    });

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
        //var f2 = f1.toString();
        //var f3 = f1[1].flow;

        var data = [
            {
                value: 48,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "f1"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            },
            {
                value: 40,
                color: "#949FB1",
                highlight: "#A8B3C5",
                label: "Grey"
            },
            {
                value: 120,
                color: "#4D5360",
                highlight: "#616774",
                label: "Dark Grey"
            }

        ];

        var myPolarAreaChart = new Chart(ctx).PolarArea(data, {
            segmentStrokeColor: "#FFFFFF"
        });







        WaterSensors.find().observe({
            added: function () {
                myPolarAreaChart.update();
            },
            changed: function () {
                myPolarAreaChart.update();
            }
        });


    }; //end rendered


}



