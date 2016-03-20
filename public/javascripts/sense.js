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
	var that= this;
	var socket = io('http://fotaxis.com:9000');
	socket.on("connect",function(){
		//$("#connectionStatus").text("connection established with server: awaiting data...");
	});

	socket.on("status",function(data){
		$("#connectionStatus").text(data.status);
	});
	socket.on('accelerometer',function(data){
		that.onAccelerometerData(data);
	});
	//socket.emit("accelerometer",{"hello":"world"});
	socket.emit("register","web");
};
MPISense.onAccelerometerData=function(accelerometerData){
	//console.log("data"+data);
	var dataArray=accelerometerData.split(",");
	this.addAccelerometerPoint(parseInt(dataArray[0]),parseInt(dataArray[1]),parseInt(dataArray[2]));
};

MPISense.accelerometerChart={};
MPISense.dataCount=0;
MPISense.addAccelerometerPoint=function(x,y,z){
	var time = (new Date()).getTime(); //its ok for small latency/delay;
	
	var seriesX=this.accelerometerChart.series[0];
	var seriesY=this.accelerometerChart.series[1];
	var seriesZ=this.accelerometerChart.series[2];
	
	seriesX.addPoint([time,x], false, false);
	seriesY.addPoint([time,y], false, false);
	seriesZ.addPoint([time,z], false, false);
	MPISense.dataCount++;
	if(MPISense.dataCount>32){ //32 values;
		MPISense.dataCount=0;
		this.accelerometerChart.redraw();
	}
	
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
