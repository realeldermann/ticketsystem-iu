import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import config from "config"
let TicketController = require("./ticket/TicketController")
let ErrorHandler = require("./error/ErrorHandler")
let UserController = require("./user/UserController")

const app = express()

const port = config.get("api.port") as number
const host = config.get("api.host") as string


export function startApi() {
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Ticketsystem API')
})

app.listen(port, host, () => {
    console.log(`API runs on http://${host}:${port}`)

})

app.use(ErrorHandler)
app.use(TicketController)
app.use(UserController)
}