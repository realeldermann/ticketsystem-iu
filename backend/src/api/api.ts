import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import config from "config"
let TicketController = require("./ticket/TicketController")
let UserController = require("./user/UserController")
let CourseController = require("./course/CourseController")
let CategorieController = require("./categorie/CategorieController")
let AnnotationController = require("./annotation/AnnotationController")
let TypeController = require("./type/TypeController")
let PriorityController = require("./priority/PriorityController")
let StatusController = require("./status/StatusController")
let ErrorHandler = require("./error/ErrorHandler")
import cookieParser from 'cookie-parser'

const app = express()

const port = config.get("api.port") as number
const host = config.get("api.host") as string


export function startApi() { //startet REST
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('Ticketsystem API')
})

app.listen(port, host, () => {
    console.log(`API runs on http://${host}:${port}`)

})

app.use(ErrorHandler)
app.use(CourseController)
app.use(CategorieController)
app.use(TicketController)
app.use(UserController)
app.use(AnnotationController)
app.use(TypeController)
app.use(PriorityController)
app.use(StatusController)
}