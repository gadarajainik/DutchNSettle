const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
    expenseName: { type: Schema.Types.String, require: true },
    expenseAmount: { type: Schema.Types.Number, require: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    paidBy: { type: Schema.Types.ObjectId, ref: "User", require: true }
});

module.exports = model("Expense", expenseSchema);