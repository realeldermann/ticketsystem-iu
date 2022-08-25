import { connect } from "mongoose";
import config from "config";

export async function connectToMongoDB() {
    await connect(`mongodb://${ config.get('db.host')}:${ config.get('db.port')}/${ config.get('db.db')}`);
    console.log(`MongoDB connected`);
}