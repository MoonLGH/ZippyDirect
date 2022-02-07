import express from "express";
import path from "path";
import {indexRouter} from "./routes/index.js";
import {APIRouter} from "./routes/api.js";
import {fileURLToPath} from "url";
import fs from "fs";
import dotenv from "dotenv";
import http from "http";
import https from "https";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const port = 8089;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/api/", APIRouter);
app.set("views", path.join(__dirname, "views"));


async function start() {
  console.log("==========");
  if (process.env.ssl === "usessl") {
    const privateKey = fs.readFileSync(process.env.PrivateKeySSLPath||"dist/app/sslcert/privatekey.pem", "utf8");
    const certificate = fs.readFileSync(process.env.CertSSLPath||"dist/app/sslcert/cert.pem", "utf8");
    const credentials = {key: privateKey, cert: certificate};

    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    const portHttps = process.env.PORTHttps || 3000;

    httpServer.listen(port, () => {
      console.log("HTTP Server running on port " + port);
    });

    httpsServer.listen(portHttps, () => {
      console.log("HTTPS Server running on port " + portHttps);
    });
  } else {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  }
}

export {start};
