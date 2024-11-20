import express from 'express';
import colors from 'colors'
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan'

import swaggerUi from 'swagger-ui-express';// permite tener un sitio web visual con la documentacion
import swaggerSpec, { swaggerUiOptions } from './config/swagger';

import router from './router'
import db from './config/db'

export async function connectDB() {
  try {
    await db.authenticate() // autenticar a la base de datos
    db.sync() // sincronizar la base de datos
    //  console.log(colors.bgBlue.white('se conecto correctamente'));
  } catch (error) {
    console.log(colors.bgRed.white('Error al conectar en la base de datos'));
  }
}

connectDB()

//instancia de express
const server = express()

// permitir conexiones
const corsOptions: CorsOptions = {
  // callback permite o niega request
  origin: function (origin, callback) {
    // el process.env.FRONTEND_URL es para que se compare correctamente el origin
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error  de Cors'))
    }
  }
}

//ejecutar corsOptions
server.use(cors(corsOptions))

// leer datos de formulario
server.use(express.json())

//choose dev, combined, tiny, common, short
// para obtener informacion de  las peticiones que se esten logeando
server.use(morgan('dev'))
//!routing
// el server.use es llamado cuando se hace una peticion desde la url para luego entrar al router
server.use('/api/products', router)

//DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server; 