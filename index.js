import "dotenv/config"
import express from 'express'
import initApp from "./src/modules/initApp.js";

const app = express();
const PORT = process.env.PORT || 4000

initApp(app, express)

app.listen(PORT, () => {
  console.log("Server is runngin on port: " + PORT)
})