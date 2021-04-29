import axios from 'axios';
import express, {response} from 'express';

const app = new express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


export {
    app
}

