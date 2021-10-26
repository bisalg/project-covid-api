const express = require('express')
const app = express()

require('dotenv').config()
require('express-async-errors')

const ConnectionDB = require('./mongoDB_connection')
const PublicRouter = require('./routes/public_route')
const AuthRouter = require('./routes/register&login_route')
const VaccinationRouter = require('./routes/vaccination_route')
const authentication = require('./middleware/authentication')
const routeNotFound = require('./middleware/routeNotFound')
const errorhandler = require('./middleware/errorhandler')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const ratelimiter = require('express-rate-limit')

//basic security setup

app.set('trust proxy', 1)
app.use(ratelimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(express.static('./public'))

app.use('/api/v1/covid', PublicRouter)
app.use('/api/v1/covid/auth', AuthRouter)
app.use('/api/v1/covid/user', authentication, VaccinationRouter)

app.use(routeNotFound)
app.use(errorhandler)

//port provided or 5000
const port = process.env.PORT || 5000


// "await" can only be used inside async funtion
const Start = async () => {
    try {
        await ConnectionDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`listening to the port ${port}...`))
    } catch (err) {
        console.log({ ConnectionERR: err });
    }
}

Start();


 //MONGO_URI is a connection string or link you will have from mongoDB after exploring 'connect' option
 //set it up as MONGO_URI = <connection linl> in .env file 

// or just use this:- mongodb+srv://<your_username>:<your_password>@myfirstnode.jsfir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority