import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import cookieParser from 'cookie-parser'
import router from './app/routes'
import { StatusCodes } from 'http-status-codes'
import globalErrorHandler from './app/middleware/globalErrorHandler'

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
});


// Application routes
app.use('/api/v1', router);


app.use( (req: Request, res: Response, next : NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        error : {
            path : req.originalUrl,
            message : "Your requested method is not found"
        }
    })
})

// Global Error Handler
app.use(globalErrorHandler);

export default app;
