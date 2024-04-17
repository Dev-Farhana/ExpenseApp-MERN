const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
dotenv.config();
// const routes = require("./routes/userRoute");

connectDb();
const app = express();

app.use(morgan("dev"));

app.use(cors());  
app.use(express.json());

app.use(express.static(path.resolve("./client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./client/dist/index.html"));
});


//for user routes;
app.use("/api/v1/users", require("./routes/userRoute"));

//for transactions routes;
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
