import express from 'express'
import dataBaseConnection from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
import patientsRouter from './routes/patientsRouter.js'
import doctorsRouter from './routes/doctorsRouter.js'
import appointmentsRouter from './routes/appointmentsRouter.js'
import userRouter from './routes/userRouter.js'
import AuthorizationUser from './middlewares/auth.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(AuthorizationUser);

app.use(express.json());
app.use('/',userRouter)
app.use('/patients',patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter)

dataBaseConnection()

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});