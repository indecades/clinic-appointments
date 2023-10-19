//imports
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//export function
exports.createDefaultAdminAccount = async (req, res) => {
	const adminUser = await Admin.findOne({
		//finds admin
		username: "admin",
	});
	if (!adminUser) {
		// if username is not 'admin
		try {
			const hashPassword = await bcrypt.hash(req.body.password, 10); // hash password
			await Admin.create({
				// create new admin
				username: req.body.username,
				password: hashPassword,
			});
			res.json({ status: "ok" }); // if json status returns as 'ok' create new admin
		} catch (error) {
			console.log(error); //logs error in console
		}
	}
};
// exports function
exports.loginAdminAccount = async (req, res) => {
	const admin = await Admin.findOne({
		// finds admin login info
		username: req.body.username,
	});
	if (!admin) {
		// if not admin
		return { status: "error" }; // return status code error
	}
	const isPasswordValid = bcrypt.compare(req.body.password, admin.password); // comparing user password and admin password after uncrypted
	if (isPasswordValid) {
		// if password is valid
		const token = jwt.sign({ username: admin.username }, "jwt-secret"); // allow user to access the account
		return res.json({ status: "ok", admin: token }); // status will then return as okay and admin has access to token
	} else {
		return res.json({ status: "error", admin: false }); // if status returns as error admin is not able to access account
	}
};
// exports function
exports.createNewAdmin = async (req, res) => {
	const newAdminUser = await Admin.findOne({
		// find one result
		username: req.body.username, // requests username
	});
	if (newAdminUser) {
		// if new admin
		return res.json({ status: "error", error: "username already exists" }); // username is already used by another admin
	} else {
		const hashPassword = await bcrypt.hash(req.body.password, 10); // hashing password to protect information
		await Admin.create({
			// creates new user
			username: req.body.username,
			password: hashPassword,
		});
		res.json({ status: "ok" }); // json status returns as 'ok' if user is successfully created
	}
};
