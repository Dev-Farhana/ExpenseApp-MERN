const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
dotenv.config();
// const routes = require("./routes/userRoute");

connectDb();
const app = express();

app.use(morgan("dev"));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     method: "POST",
//     credentials: "true",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// );

app.use(cors());  
app.use(express.json());

//for user routes;
app.use("/api/v1/users", require("./routes/userRoute"));

//for transactions routes;
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
