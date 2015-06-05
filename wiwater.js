WaterSensors = new Mongo.Collection('sensors');


if (Meteor.isServer) {


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

        var drawChart = function (update) {

            $('#myfirstchart').empty();

            var data = WaterSensors.find({},{fields:{node:1,flow:1},sort:{node:1}}).fetch();

            /*
            var f1 = WaterSensors.findOne({'node':1}).flow;
            var data = [
                { year: '2008', value: f1},
                { year: '2009', value: f1+10}
            ];
            */

            if (!update) {
            } else {
            }

            if (data) {
                new Morris.Bar({
                    // ID of the element in which to draw the chart.
                    element: 'myfirstchart',
                    // Chart data records -- each entry in this array corresponds to a point on
                    // the chart.
                    data:    data,
                    // The name of the data record attribute that contains x-values.
                    xkey:    'node',
                    // A list of names of data record attributes that contain y-values.
                    ykeys:   ['flow'],
                    // Labels for the ykeys -- will be displayed when you hover over the
                    // chart.
                    labels:  ['Value'],
                    resize:  true
                });
            }
        }


        WaterSensors.find().observe({
            added: function () {
                drawChart(false);
            },
            changed: _.partial(drawChart, true)
        });

    }; //end rendered


}



