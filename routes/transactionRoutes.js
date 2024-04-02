const express = require("express");
const { getAllTransaction, addTransaction, deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();

router.post("/get-transaction", getAllTransaction );

router.post("/add-transaction", addTransaction );

router.delete("/delete-transaction", deleteTransaction );


module.exports = router;
