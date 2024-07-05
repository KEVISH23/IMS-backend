import 'reflect-metadata'
import { dbConnect } from "./db/dbConnect";
import config from 'config'
import cors from 'cors'
import './controller'
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config';
import path from 'path'
const app = express()
app.use(express.json())
app.use(cors())
app.use("/public", express.static(path.join(__dirname, 'public')));
const server = new InversifyExpressServer(container,app)
server.setConfig(async ()=>{
    await dbConnect()
})
server.build().listen((config.get('port')),()=>console.log('port connection established'))