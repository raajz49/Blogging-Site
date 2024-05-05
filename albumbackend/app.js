const express =require('express')
const cors = require('cors');
const app= express();

// import rootRouter from './routes/index.js';

app.use(cors());
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

app.use(express.json());

// app.use('/api',rootRouter);

const UserRoutes=require('./routes/User')
app.use('/user',UserRoutes)

const AuthRoutes= require('./routes/Auth')
app.use('/api',AuthRoutes)

const PostRoutes=require('./routes/Post')
app.use('/posts',PostRoutes)
 
const CommentRoutes=require('./routes/Comment')
app.use('/comments',CommentRoutes)

const AlbumRoutes=require('./routes/Album')
app.use('/albums',AlbumRoutes)



const PhotoRoutes=require('./routes/Photo');
const ErrorController = require('./controllers/error-controller');
const PORT  = require('./secret');


app.use('/photos',PhotoRoutes)

app.use(ErrorController)
const port = process.env.PORT|| 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});