//imports
const appointment = require("../models/appointments.model");

const generateId = () => {
	return Math.floor(Math.random() * Date.now()); // generates random number for id
};

exports.createNewAppointment = async (req, res) => {
	const id = generateId(); // generates new random id
	const dateInNumberFormat = new Date(req.body.date).getTime(); // req date and time
	let appointmentModel = new appointment({
		// gets body of new appointment from front end and stores the information in the backend
		id: id,
		patientName: req.body.patientName,
		patientLastName: req.body.patientLastName,
		date: dateInNumberFormat,
		time: req.body.time,
		purpose: req.body.purpose,
		phoneNumber: req.body.phoneNumber,
		medicalAid: req.body.medicalAid,
		smoker: req.body.smoker,
		type: req.body.type,
	});
	await appointmentModel.save(); // waits for new appointment to save
};

exports.findAllAppointments = async (req, res) => {
	// finds all appointments
	try {
		const appointments = await appointment.find(); // waits to fidn all appointments
		res.send(appointments); // sends found appointments to the front-end
	} catch (error) {
		console.log(error); // logs error in console
	}
};

exports.updateById = async (req, res) => {
	// updates appointment with new info
	try {
		const updatedAppointment = await appointment.findOneAndUpdate(
			{ id: req.body.id }, // finds appointment being updated and updates it
			{
				// sets old appointment data to new data (requested info from the body in the front-end)
				id: req.body.id,
				patientName: req.body.patientName,
				patientLastName: req.body.patientLastName,
				date: req.body.date,
				time: req.body.time,
				purpose: req.body.purpose,
				phoneNumber: req.body.phoneNumber,
				medicalAid: req.body.medicalAid,
				smoker: req.body.smoker,
				type: req.body.type,
			},
			{ new: true }
		);
		res.status(200).json(updatedAppointment); // send the updated appointment as a response
	} catch (error) {
		console.log(error); //logs error in console
	}
};

exports.deleteById = async (req, res) => {
	// deletes appointments by using their id
	try {
		await appointment.findOneAndRemove({
			// finds appointment by id and removes it
			id: req.body.id, // request the id of the apppointment being deleted from the front- end
		});
	} catch (error) {
		console.log(error); // logs error in console
	}
};

exports.findUserAppointments = async (req, res) => {
	// finds user appointment
	try {
		const dateToday = new Date().getTime(); // returns date today
		const twoWeeks = new Date(dateToday + 1209600000).getTime(); //amount of mil sec in 2 weeks
		const appointments = await appointment.find({
			date: { $gt: dateToday, $lt: twoWeeks },
		}); // displays appointments for 2 weeks
		res.send(appointments); // sends appointments result to front-end
	} catch (error) {
		console.log(error); // logs error in console
	}
};
