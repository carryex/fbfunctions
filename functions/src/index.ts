import * as functions from "firebase-functions";
import {app} from "./app";
import "./controllers";
console.log("hello world");


exports.webApi = functions.https.onRequest(app);
