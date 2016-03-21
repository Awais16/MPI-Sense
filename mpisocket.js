
var Server = require('socket.io');

var MPISocket={
	socket:{},
	socketWeb:null,
	init:function(server){
		var io= new Server(server);
		io.on('connection',this.onConnection);
		
	},
	onConnection:function(socket){
		MPISocket.socket=socket;
		MPISocket.sendStatus("Connected with server");
		console.log('New connection from ' + socket.request.connection.remoteAddress);
		
		socket.on('accelerometer',MPISocket.onAccelerationRecieved);
		socket.on('bvp',MPISocket.onBVPRecieved);
		socket.on('register',MPISocket.onRegister);
	},
	onRegister:function(data){
		console.log("onRegister");
		if(data=="web"){
			MPISocket.socketWeb=MPISocket.socket;
		}
	},
	onAccelerationRecieved:function(data){
		if(MPISocket.socketWeb!=null){
			MPISocket.socketWeb.emit('accelerometer',data);
		}
	},
	onBVPRecieved:function(data){
		if(MPISocket.socketWeb!=null){
			MPISocket.socketWeb.emit('bvp',data);
		}
	},
	sendStatus:function(status){
		this.socket.emit("status",{status:status});
	},
	sendAccelerometer:function(data){
		this.socket.emit("accelerometer",{data:data});	
	}
	
};

module.exports=MPISocket;