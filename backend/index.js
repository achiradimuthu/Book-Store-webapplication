import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

//Middleware for psrsing request body
app.use(express.json());

//Middleware for handling CORS policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors());
//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello Achira...");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch(() => {
    console.log(error);
  });
