import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import * as socket from '../sockets/sockets'
import http from 'http';

export default class Server{
    private static _instance : Server;

    public app: express.Application;
    public port: number;
    public httpServer: http.Server;
    public io: socketIO.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = http.createServer(this.app);
        this.io = new socketIO.Server(this.httpServer);
        this.escucharSocket();
    }

    public static  get instance(){

        return this._instance || (this._instance = new this());
    }

    private escucharSocket(){

        console.log('Escuchando conexiones - Sockets');

        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado');

            //Mensajes
            socket.mensaje(cliente, this.io);

            //desconectar
            socket.desconectar(cliente);
        });
    }

    start( callback : ()=>void){

        this.httpServer.listen(this.port, callback);

    }
}