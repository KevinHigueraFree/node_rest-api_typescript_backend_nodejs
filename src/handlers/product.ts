import { Request, Response } from 'express';// son variables de express y serviran´para asignarle el tipo de dato a res req
import Product from '../models/Product.model'



export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
      order: [
        ['id', 'DESC']
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: products })

  
}

export const getProductById = async (req: Request, res: Response) => {

  try {

    const { id } = req.params;
    const product = await Product.findByPk(id)

    if (!product) {
      res.status(404).json({
        error: 'Producto no encontrado'
      })
      return
    }

    res.json({ data: product })


  } catch (error) {
    console.log(error);
  }
}

export const createProduct =

  async (req: Request, res: Response): Promise<void> => {

    try {

      const product = await Product.create(req.body)
      res.status(201).json({ data: product })

    } catch (error) {

    }
  }
export const updateProduct =
  async (req: Request, res: Response)=> {


      const { id } = req.params;
      const product = await Product.findByPk(id)

      if (!product) {
        
         res.status(404).json({
          error: 'Producto no encontrado'
        })
        return
      }

      //Update
      await product.update(req.body);
      await product.save();
      res.json({ data: product })



  }

export const updateAvalability =
  async (req: Request, res: Response)=> {

    const { id } = req.params;
    const product = await Product.findByPk(id)
    
    if (!product) {
      res.status(404).json({
        error: 'Producto no encontrado'
      })
      return
    }

    //Update
    product.avalability = !product.dataValues.avalability;
    await product.save();

    res.json({ data: product })
  }

export const deleteProduct =
  async (req: Request, res: Response)=> {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({
        error: 'Producto no encontrado'
      })
      return
    }
  

    await product.destroy()
    res.json({ data: 'Producto Eliminado' })

  }