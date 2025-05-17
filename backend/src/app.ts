import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import cookieParser from 'cookie-parser'

app.use(cors())
app.use(cookieParser())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

export default app
