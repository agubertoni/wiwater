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

        var drawChart = function (update) {

            $('#myfirstchart').empty();

            var data = [
                { year: '2008', value: 20 },
                { year: '2009', value: 10 },
                { year: '2010', value: 5 },
                { year: '2011', value: 5 },
                { year: '2012', value: 20 }
            ];

            //var data = WaterSensors.findOne({'node':1}).data;

            if (!update) {
            } else {
            }

            if (data) {
                new Morris.Line({
                    // ID of the element in which to draw the chart.
                    element: 'myfirstchart',
                    // Chart data records -- each entry in this array corresponds to a point on
                    // the chart.
                    data:    data,
                    // The name of the data record attribute that contains x-values.
                    xkey:    'year',
                    // A list of names of data record attributes that contain y-values.
                    ykeys:   ['value'],
                    // Labels for the ykeys -- will be displayed when you hover over the
                    // chart.
                    labels:  ['Value'],
                    resize:  true
                });
            }
        }


        Circles.find().observe({
            added: function () {
                drawChart(false);
            },
            changed: _.partial(drawChart, true)
        });

    }; //end rendered


}



