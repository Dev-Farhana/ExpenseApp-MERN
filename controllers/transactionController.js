const transactionModel = require("../models/transactionModel");

const getAllTransaction = async (req,res) =>{
  try {
    const transactions = await transactionModel.find({
      userid: req.body.userid
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json(error);
    console.log("Err ==>", error);     
  }
}

const addTransaction = async(req,res) => {
  try {
    const newTransaction= new transactionModel(req.body);
    await newTransaction.save();
    res
    .status(200)
    .json(`Transaction Created! , ${newTransaction}`);
  } catch (error) {
    res.status(400).json(`Transaction not created ;/ ${error}`);
    console.log("Err ==>" , error);
  }
}

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionModel.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getAllTransaction , addTransaction, deleteTransaction}