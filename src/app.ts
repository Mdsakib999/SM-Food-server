/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';

const app: Application = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.use('/api/v1', router);

app.use(globalErrorHandler)

// Use middleware with @ts-ignore to suppress type error
// @ts-ignore
app.use(notFound);



export default app