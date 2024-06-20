import { Router, Request, Response} from 'express';

const router = Router();

//creacion de rest tipo  GET
router.get('/mensajes', ( req: Request , res: Response )=> {
    res.json({
        ok: true,
        mensaje: 'todo al cien'
    });
});

router.post('/mensajes', ( req: Request , res: Response )=> {
    const payload = req.body.payload;
    const de = req.body.de;

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

    res.json({
        ok: true,
        payload,
        de,
        id
    });
});


export default router;