import productsRouter from './products/products.router.js'
import categoriesRouter from './categories/categories.router.js'
import connectDB from '../../db/connection.js'
import authRouter from '../modules/auth/auth.router.js'
import subCategoryRouter from './subcategory/subcategory.router.js'
import couponRouter from './coupon/coupon.router.js'
import { sendEmail } from '../services/email.js'

const initApp = async (app, express) => {
  connectDB()
  app.use(express.json())
  app.use('/products', productsRouter)
  app.use('/categories', categoriesRouter)
  app.use('/auth', authRouter)
  app.use('/subcategory', subCategoryRouter)
  app.use('/coupon', couponRouter)
  app.use('*', (req, res) => res.status(404).json({ msg: "page not found" }))
}

export default initApp;