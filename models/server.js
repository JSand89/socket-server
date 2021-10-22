const express=require('express');
const http =require('http');
const socketio = require('socket.io');
const path= require('path');

const Sockets = require('./sockets')





class Server{

    constructor(){
        this.app  = express();
        this.port= process.env.PORT;

        //http server
        this.server=http.createServer(this.app);

        // setting sockets
        this.io = socketio(this.server,{/*config */});


    }


    middlewares(){
        //deploy public directory

        this.app.use( express.static( path.resolve( __dirname, '../public')));
    }

        //setting socket
    settingSockets(){
        new Sockets(this.io);
    }
    
    
    execute(){

        //init middlewares
        this.middlewares();
        // init sockets
        this.settingSockets();
        //init seever
        this.server.listen( this.port,()=>{
            console.log("server runing port:",this.port)
        });
    }
}

module.exports=Server;