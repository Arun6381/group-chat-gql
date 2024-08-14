const mongoose = require("mongoose");

// Define the schema for messages
const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  user: { type: String, required: true },
  content: { type: String, required: true },
});

// Create and export the model based on the schema
const MessageModel = mongoose.model("Message", messageSchema);

module.exports = { MessageModel };
