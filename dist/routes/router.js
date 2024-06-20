"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//creacion de rest tipo  GET
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'todo al cien'
    });
});
router.post('/mensajes', (req, res) => {
    const payload = req.body.payload;
    const de = req.body.de;
    res.json({
        ok: true,
        payload,
        de
    });
});
//servicio rest para enviar parametros por peticion POST
router.post('/mensajes/:id', (req, res) => {
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
exports.default = router;
