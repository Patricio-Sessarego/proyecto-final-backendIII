import swaggerUiExpress from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import express from 'express'

//ROUTERS
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import usersRouter from './routes/users.router.js'
import mocksRouter from './routes/mocks.router.js'
import petsRouter from './routes/pets.router.js'

//APP
const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(`mongodb+srv://Patricio-Sessarego:Patricio2005@clustercoderhouse.jdm36.mongodb.net/BackendIII?retryWrites=true&w=majority&appName=ClusterCoderHouse`)
//MIDDLEWARE
app.use(express.json())
app.use(cookieParser())

//RUTAS
app.use('/api/adoptions',adoptionsRouter)
app.use('/api/sessions',sessionsRouter)
app.use('/api/mocks' , mocksRouter)
app.use('/api/users',usersRouter)
app.use('/api/pets',petsRouter)

//LISTEN
app.listen(PORT , () => console.log(`ESUCHANDO EN PUERTO ${PORT}`))

//CONFIGURACION DE SWAGGER
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",

        info: {
            title: "Documentacion de la App Adoptme",
            description: "App dedicada a encontrar familias para los animales."
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

//CONECTAMOS SWAGGER CON EXPRESS
const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs' , swaggerUiExpress.serve , swaggerUiExpress.setup(specs))