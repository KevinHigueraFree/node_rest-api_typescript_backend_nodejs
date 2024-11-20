import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config()// mandamos llamanr las variables de entorno y las  que tenemos en el archivo


// opcion 1
const db = new Sequelize(process.env.DATABASE_URL!,{
models:[__dirname+'/../models/**/*'],
logging:false
})

/*
    //OPCION 2
const db = new Sequelize('postgresql://rest_api_node_db_user:IK3C85Zi1rhYAUSzmk70DJk9eGEmPbhx@dpg-csncraij1k6c73b1d6eg-a.oregon-postgres.render.com/rest_api_node_db',{
    dialectOptions:{
        ssl:{
            require:false
        }
    }
})
    */
export default db