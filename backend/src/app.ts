import { connectToMongoDB } from "./db/dbconnector";

async function init() {
    console.log("Start init")
    await connectToMongoDB()
    console.log("End init")
}

init()