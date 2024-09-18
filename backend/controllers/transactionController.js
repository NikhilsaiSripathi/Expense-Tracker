const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// Add a new transaction
const addTransaction = async (req, res, next) => {
  const { text, amount } = req.body;

  // Basic validation
  if (!text || !amount) {
    res.status(400);
    return next(new Error('Please provide both text and amount'));
  }

  try {
    const transaction = await Transaction.create({ text, amount });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// Update a transaction
const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      return next(new Error('Transaction not found'));
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// Delete a transaction
const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      return next(new Error('No transaction found'));
    }

    await transaction.remove();
    res.status(200).json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
