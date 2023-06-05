import express from 'express';
import router from './routers/routers';
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
    res.send("servidor corriendo");
});

app.get('/api',async (_req,res)=>{
    res.sendFile(__dirname + '/html/index.html');
})

app.use('/api', router);

app.listen(PORT, () => {
    console.log('server running on port:',PORT)
})