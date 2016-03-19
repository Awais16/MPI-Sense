
var Server = require('socket.io');

var MPISocket={
	socket:{},
	init:function(server){
		var io= new Server(server);
		io.on('connection',this.onConnection)
	},
	onConnection:function(socket){
		MPISocket.socket=socket;
		MPISocket.sendStatus("Connected with server");
	},
	sendStatus:function(status){
		this.socket.emit("status",{status:status});
	},
	sendAccelerometer:function(data){
		this.socket.emit("accelerometer",{data:data});	
	}
	
};

module.exports=MPISocket;