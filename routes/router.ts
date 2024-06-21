import  Server  from '../classes/server';
import { Router, Request, Response} from 'express';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

//creacion de rest tipo  GET
router.get('/mensajes', ( req: Request , res: Response )=> {
    res.json({
        ok: true,
        mensaje: 'todo al cien'
    });
});

//Servicio para obtener el ID
/*router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients((err, clientes:Socket)=>{
        if(err){
            res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    })

});*/

router.get('/usuarios/detalle', (req: Request, res: Response)=>{
    res.json({
        ok: true,
        clientes : usuariosConectados.getLista()
    });

});

router.post('/mensajes', ( req: Request , res: Response )=> {
    const payload = req.body.payload;
    const de = req.body.de;
    const cuerpo = {
        de,
        payload
    };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', cuerpo)

    res.json({
        ok: true,
        payload,
        de
    });
});

//servicio rest para enviar parametros por peticion POST
router.post('/mensajes/:id', ( req: Request , res: Response )=> {
    const payload = req.body.payload;
    const de = req.body.de;
    const id = req.params.id;
    const cuerpo = {
        de,
        payload
    };

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', cuerpo)

    res.json({
        ok: true,
        payload,
        de,
        id
    });
});


export default router;