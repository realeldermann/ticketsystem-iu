import { connectToMongoDB } from "./db/dbconnector"
import { startApi } from "./api/api"

async function init() {
    console.log("Start init")
    await connectToMongoDB()
    startApi()
    console.log("End init")
}

init()