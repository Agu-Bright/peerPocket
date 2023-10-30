require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/connectDb");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
//routes
const authRoute = require("./routes/authRoute");
const loanRoute = require("./routes/loanRoute");
const transferRoute = require("./routes/transferRoute");

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Shutting down due to Uncaught Exceptions");
  process.exit(1);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-with, Content-Type, Accept"
  );
  next();
});

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//app routes goes here guys
app.use("/api/v1", authRoute);
app.use("/api/v1/peerloan", loanRoute);
app.use("/api/v1/transfer", transferRoute);

app.use(errorMiddleware);

//serve static assets
if (
  process.env.NODE_ENV === "PRODUCTION" ||
  process.env.NODE_ENV == "staging"
) {
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
  });
}

//start server
const start = async () => {
  try {
    await db(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server Listening on port:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    console.log("Shutting down the server due to unhandled promise rejection");
    process.exit(1);
  }
};
start();
