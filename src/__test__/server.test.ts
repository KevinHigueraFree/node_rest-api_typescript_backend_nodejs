import { connectDB } from '../server'
import db from '../config/db'

//! mock to generate an error tp db
jest.mock('../config/db')// creamos un mock e importamos la consifguracion e instancia sequelize

describe('connectDB', () => {
    test('should handle database conection error', async () => {
        //todo spyOn: crea una simulacion(espia) tomando en cuenta la base de datos y el metodo el cual será puesto a prueba para observar su comportamiento

        jest.spyOn(db, 'authenticate')
            // con el mockRejectedValueOnce lazamos una escepcion(error) para que se vaya al catch
            .mockRejectedValueOnce(new Error('Error al conectar en la base de datos'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()// hace la coneccion (la manda llamar)

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error al conectar en la base de datos'))// que contenga un texto

    })
})



