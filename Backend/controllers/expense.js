const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validation
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date
        });

        await expense.save();
        console.log("Expense saved:", expense);

        res.status(200).json({ message: 'Expense added' });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error getting expenses:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);
        if (deletedExpense) {
            res.status(200).json({ message: 'Expense Deleted' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
