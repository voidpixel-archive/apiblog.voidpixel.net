
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import {NextFunction, Request, Response} from "express";
import {readdirSync, readFileSync} from "fs";
import {join} from "path";
import {Language, Post} from "./types";

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    console.log(`[${req.connection.remoteAddress}] ${req.method} ${req.url.substr(0, Math.min(req.url.length, 64))}`);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const api = express.Router();

app.use('/api', api);


const getPostList = (): string[] => readdirSync(join(__dirname, 'posts/'));
const getPost = (id: string): Post => {
    const postPath = `posts/${id}/`;
    const data = JSON.parse(readFileSync(join(__dirname, postPath, `data.json`)).toString()) as Post;
    data.post = Object.values(Language).reduce((_data, languageId) => ({
        ..._data,
        [languageId]: {
            title: data.post[languageId].title,
            content: readFileSync(join(__dirname, postPath, `${languageId}.md`)).toString()
        }
    }), {}) as any;
    return data;
};

const getPosts = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send({
        data: getPostList()
    });
}

const getPostById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const postExists = getPostList().some(postId => postId === id);
    if(!postExists) return res.sendStatus(404);

    res.send({
        data: getPost(id)
    });
}

api.get('/posts', getPosts);
api.get('/post/:id', getPostById);

const server = require('http').createServer(app);

server.listen(
    process.env.PORT || 80,
    'localhost',
    () => console.log(`listening :${process.env.PORT}`)
);