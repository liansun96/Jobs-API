require("dotenv").config();
require('express-async-errors')
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");

app.use(express.json());

const authencticateUser = require('./middleware/authentication')

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authencticateUser, jobsRouter);

app.get("/", (req, res) => {
  res.send("Job Api");
});

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on ${port} . . .`));
  } catch (error) {
    console.log(error);
  }
};

start();
