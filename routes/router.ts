import { Router, Request, Response} from 'express';
import { GraficaData } from '../classes/grafica';

const router = Router();
const grafica = new GraficaData();

//creacion de rest tipo  GET
router.get('/grafica', (req: Request, res: Response) => {
    // Genera las categorías basadas en la hora actual y las últimas 12 horas
    const categories = generateHourlyCategories();

    // Genera datos aleatorios para transacciones aprobadas y rechazadas
    const series = {
        aprobadas: generateRandomData(),
        rechazadas: generateRandomData()
    };

    // Calcula los totales sumando las transacciones aprobadas y rechazadas
    const totales = series.aprobadas.map((aprobada, index) => aprobada + series.rechazadas[index]);

    const data = {
        series: [
            {
                name: "Rechazadas",
                data: series.rechazadas
            },
            {
                name: "Aprobadas",
                data: series.aprobadas
            },
            {
                name: "Totales",
                data: totales
            }
        ],
        categories: categories
    };

    res.json(data);
});

// Función para generar las categorías basadas en la hora actual y las últimas 12 horas
function generateHourlyCategories() {
    const currentHour = new Date().getHours();
    const categories = [];

    for (let i = 0; i < 12; i++) {
        const hour = (currentHour - 12 + i) % 24; // Asegura que los valores estén en el rango de 0-23
        categories.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return categories;
}

function generateRandomData() {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
}

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