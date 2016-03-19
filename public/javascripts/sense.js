if(window.MPISense == undefined){
    window.MPISense = {};
}

MPISense.init = function() {
	//lets get started

	Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

	this.initAcclerometerChart();
	this.initSocket();
};

MPISense.initSocket=function(){
	var socket = io('http://localhost:9000');
	socket.on("connect",function(){
		//$("#connectionStatus").text("connection established with server: awaiting data...");
	});

	socket.on("status",function(data){
		$("#connectionStatus").text(data.status);
	});
	socket.on('accelerometer',MPISense.onAccelerometerData);
	socket.emit("accelerometer",{"hello":"world"});
};
MPISense.onAccelerometerData=function(data){
	console.log("data"+data);
};

MPISense.accelerometerChart={};

MPISense.addAccelerometerPoint=function(x,y,z){
	var time = (new Date()).getTime();
	
	var seriesX=this.accelerometerChart.series[0];
	var seriesY=this.accelerometerChart.series[1];
	var seriesZ=this.accelerometerChart.series[2];
	
	seriesX.addPoint([time,x], false, false);
	seriesY.addPoint([time,y], false, false);
	seriesZ.addPoint([time,z], false, false);

	this.accelerometerChart.redraw();
};

MPISense.initAcclerometerChart=function(){
	$('#accelerometerGraph').highcharts('StockChart', {
        chart : {
            events : {
                load : function () {
                    // set up the updating of the chart each second
                    /*var seriesX = this.series[0];
                    var seriesY = this.series[1];
                    var seriesZ = this.series[2];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random() * 100),
                            y1=Math.round(Math.random() * 100),
                            y2=Math.round(Math.random() * 100);
                        seriesX.addPoint([x, true);
                        seriesY.addPoint([x, y1], true, true);
                        seriesZ.addPoint([x, y2], true, true);
                    }, 1000);*/
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Accelerometer Data'
        },

        exporting: {
            enabled: true
        },

        series : [{
            name : 'x-axis'
            
        },{
            name : 'y-axis'
        },{
            name : 'z-axis'
        }]
    });
	this.accelerometerChart=$('#accelerometerGraph').highcharts();
};
