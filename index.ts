import cors from 'cors';
import bodyParser from "body-parser";
import Server from "./classes/server";
import router  from "./routes/router";



const server = Server.instance;

//body parser {funciona para obtener los datos del server y castearlos a json}
//NOTA: es importante ponerlo entes de las rutas
server.app.use( bodyParser.urlencoded({ extended : true }) );
server.app.use( bodyParser.json() );

//CORS
server.app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
//server.app.use( cors({origin: true, credentials: true}));

//rutas de servicio
server.app.use('/', router)

server.start (()=>{
    console.log(`servidor corriendo en ${server.port}`);
})