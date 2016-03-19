
var Server = require('socket.io');

var MPISocket=function(){};

MPISocket.prototype.init=function(server){
	this.io=new Server(server);
	this.io.on('connection', MPISocket.prototype.onConnection);
};

MPISocket.prototype.onConnection=function(socket){
	console.log("onConnection");

	socket.on("acclerometer",function(data){
		console.log("accleration recieved"+data);
	});
};

module.exports=new MPISocket();