import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

export default class Server {
    
    private static _instance: Server; 
    public app: express.Application;
    public port: number;
    public io: SocketIOServer;
    public httpServer: http.Server;

    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = new SocketIOServer(this.httpServer);
        this.escucharSockets();
    }

    
    //metodo Singleton para asegurarme de que solo se use una instancia
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(){

        console.log('Escuchando conexiones');
        // "in " sirve para escuchar
        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado');
        } );
    }

    start( callback: () => void ){

        this.httpServer.listen(this.port, callback );
    }
}