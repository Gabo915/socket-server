import socketIO from 'socket.io';
import { Socket } from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuarioLista } from '../classes/usuarios-lista';


export const usuariosConectados = new UsuarioLista();

export const conectarcliente = (cliente: Socket) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) =>{
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
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
        usuariosConectados.actualizaNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado `
        })
        //io.emit('Usuario Nuevo', payload )
    });
}