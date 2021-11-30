import express from "express";
import {AppRouter} from "./AppRouter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(AppRouter.instanse);

export {app};
