import { Router } from "express";
import { ProductManager } from "../productmanager.js";
import { productModel } from "../models/Products.js";

//const productManager = new ProductManager ('productos.txt')

const productRouter = Router()

productRouter.get("/", async (req,res) => {
    try{
        //const products = await productModel.find()
        const options = {
            page: 1,
            limit: 8,
            sort: {price: -1}
        }
        const products = await productModel.paginate({category: "fiambre"}, options)
        res.send(products)
        
    }catch{
        res.send (error)
    }
    
})


productRouter.get('/:id', async (req, res) => {
    const product = await productModel.findOne({_id: req.params.id})
    /*res.render('product', {
        title: product.title,
        description: product.description,
        price: product.price,
        code: product.code,
        stock: product.stock //esto es para handlebars
    })*/
    res.send(product) //esto es para postman
 
})

productRouter.post('/', async (req,res) => {
    const {title, description, code, category, price, stock, status, tumbnail} = req.body
     await productModel.create({title, description, code, category, price, stock, status, tumbnail})
    // req.io.emit("mensaje", "Hola")
    res.send("Producto creado")
})

productRouter.put('/:id', async (req,res) => {
    const id = req.params.id
    const {title, description, code, category, price, stock, status, tumbnail} = req.body
    const mensaje = await productModel.updateOne({_id:id},{title, description, code, category, price, stock, status, tumbnail})
    res.send(mensaje)
})

productRouter.delete('/:id', async (req,res) => {
    const id = req.params.id
    const mensaje = await productModel.deleteOne({_id: id})
    res.send(mensaje)
})

export default productRouter