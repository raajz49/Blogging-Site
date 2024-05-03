const express =require('express')
const cors = require('cors');
const app= express();

app.use(cors());
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

app.use(express.json());


// const UserRoutes=require('./routes/User')
// app.use('/user',UserRoutes)

const AuthRoutes=require('./routes/Auth')
app.use('/auth',AuthRoutes)

const PostRoutes=require('./routes/Post')
app.use('/posts',PostRoutes)
 
const CommentRoutes=require('./routes/Comment')
app.use('/comments',CommentRoutes)

const AlbumRoutes=require('./routes/Album')
app.use('/albums',AlbumRoutes)

const PhotoRoutes=require('./routes/Photo');
const ErrorController = require('./controllers/error-controller');
app.use('/photos',PhotoRoutes)

app.use(ErrorController)

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});