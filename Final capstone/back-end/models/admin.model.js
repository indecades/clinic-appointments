const mongoose = require("mongoose");
// creates new collection and document in database
const admin = new mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String }
	},
	{ collection: "admin-data" }
);
const model = mongoose.model("admin-data", admin);
module.exports = model;
