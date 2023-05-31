import express from 'express';
import { getUser } from './services/userServices';
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//middlewares
app.use(express.json()); //middleware que trasforma la req.body a un json
app.use(express.urlencoded({ extended:false }));
app.use(cors())

const PORT = process.env.PORT;

app.get('/ping', async (_req,res) => {
    console.log("servidor corriendo");
    console.log(await getUser("sebastian.astudillo@alumnos.ucn.cl"))
    res.send("servidor corriendo");
});

app.listen(PORT, () => {
    console.log('server running on port:',PORT)
})