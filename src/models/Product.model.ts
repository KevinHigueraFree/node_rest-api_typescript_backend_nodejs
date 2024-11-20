import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)


    })
    declare name: string

    @Column({
        type: DataType.FLOAT(5)
    })
    declare price: number

    @Default(true)// HCAE QUE POR DEFAULT SEA TRUE
    @Column({
        type: DataType.BOOLEAN
    })
    declare avalability: boolean
}

export default Product