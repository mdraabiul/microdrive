import express from "express";
import "dotenv/config.js";
import router from "./routers/router.js";
import db from "./config/db.js";
import cors from 'cors';
import helmet from "helmet";
import bodyParser from 'body-parser'
import morgan from "morgan";

const app = express();


app.use(cors());
app.use(helmet());
app.use(bodyParser.json({extended : true, limit:"50mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('tiny'));




// routers
app.use(router);








const port = process.env.PORT || 8000;
db().then(() => {
  
  app.listen(port, () => {
    console.log("Local: http://localhost:" + port);
  });


 
});
