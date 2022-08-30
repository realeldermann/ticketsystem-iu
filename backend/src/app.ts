import { connectToMongoDB } from "./db/dbconnector"
import { startApi } from "./api/api"

async function init() { //Startet das Backend (MongoDBconnection und REST Api)
    console.log("Start init")
    await connectToMongoDB()
    await startApi()
    console.log("End init")
}

init()