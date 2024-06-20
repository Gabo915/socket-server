import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket) =>{
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');

    })

}

//Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{
        console.log('Mensaje Recibido', payload);

        io.emit('mensaje-nuevo', payload);

    })
}

export const usuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) =>{
        console.log('Usuario conectado por socket', payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado `
        })
        //io.emit('Usuario Nuevo', payload )
    });
}