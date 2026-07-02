import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'


const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
connectDB()

const port = process.env.PORT || 3000
//Routes
app.use('/api/auth', authRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})