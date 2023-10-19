//imports
import React from "react";
import "../css/adminDashboard.css";
import CreateNewAppointment from "./CreateNewAppointment";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import {
	TextField,
	Dialog,
	DialogContent,
	DialogTitle,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import jwt_decode from "jwt-decode";

const AdminDashboard = () => {
	//useState states
	const [adminAppointments, setAdminAppointments] = useState([]);
	const [open, setOpen] = useState(false);
	const [editAppointmentId, setEditAppointmentId] = useState("");
	const [updatedName, setUpdatedName] = useState("");
	const [updatedLastName, setUpdatedLastName] = useState("");
	const [updatedDate, setUpdatedDate] = useState(null);
	const [updatedTime, setUpdatedTime] = useState("");
	const [updatedPurpose, setUpdatedPurpose] = useState("");
	const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
	const [updatedMedicalAid, setUpdatedMedicalAid] = useState("");
	const [updatedSmoker, setUpdatedSmoker] = useState("");
	const [updatedType, setUpdatedType] = useState("");
	// useEffect
	useEffect(() => {
		//checks if user is signed in
		const token = localStorage.getItem("token"); //gets token from local storage
		if (token) {
			const user = jwt_decode(token); // decodes token
			if (!user) {
				localStorage.removeItem("token"); // removes token
				window.location.href = "/admin-login"; // takes user to login page if user is not signed in
			} else {
				populateAppointments();
			}
		}
	}, []);

	const populateAppointments = async () => {
		// fetching appointments from backend and setting to state
		await fetch("/app/admin-appointments")
			.then((res) => res.json()) // then response from json
			.then((appointments) => setAdminAppointments(appointments)); //then set json response to state
	};

	const toOpenEditDialog = async (e) => {
		const selectedAppointmentId = e.target.value; // targets selected values
		setOpen(true); // sets open dialog to true
		setEditAppointmentId(selectedAppointmentId); // sets targeted value to state
	};

	const closeEditDialog = () => {
		setOpen(false); // sets state to false to close dialog
	};

	const handleUpdatedDate = (selectedDate) => {
		setUpdatedDate(selectedDate); // sets state to updated date
	};

	const handleUpdatedTime = (selectedTime) => {
		const stringifyTime = selectedTime.toString(); // sets time to string
		const time = stringifyTime.substring(16, 21); //cleans up time format
		setUpdatedTime(time);
	};
	// handles edited appointments
	const handleEditAppointment = () => {
		const convertedDate = updatedDate.getTime(); // gets new date value
		fetch("/app/edit-appointment", {
			// fetches file path
			method: "PUT", // put method
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				// sets new appointment information to state values
				id: editAppointmentId,
				patientName: updatedName,
				patientLastName: updatedLastName,
				date: convertedDate,
				time: updatedTime,
				purpose: updatedPurpose,
				phoneNumber: updatedPhoneNumber,
				medicalAid: updatedMedicalAid,
				smoker: updatedSmoker,
				type: updatedType,
			}),
		})
			.then((res) => res.json()) // then response json
			.then((updatedAppointment) => {
				// update the state with the updated data
				const updatedAppointments = adminAppointments.map((appointment) => {
					// if appointment id is equal to the updated appointments is
					if (appointment.id === updatedAppointment.id) {
						return updatedAppointment; // return the updated appointment
					}
					return appointment; // return appointment
				});
				// update the state of the admin appointments with the updated data
				setAdminAppointments(updatedAppointments);
				setOpen(false); // close the edit dialog
			})
			.catch((error) => {
				console.error(error); //logs error in console
			});
	};

	const handleDeleteAppointment = async (e, appointmentId) => {
		await fetch("/app/delete-appointment", {
			// fetches file path
			method: "DELETE", // delete method
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: appointmentId, // removes current id of deleted appointment
			}),
		});
		populateAppointments(); // displays appointments without deleted appointment
	};

	const handleSignout = () => {
		localStorage.removeItem("token"); // removes token from local storage
		window.location.href = "/admin-login"; //takes user to login page
	};
	const adminData = adminAppointments.map((appointment) => {
		// maps through appointments
		const dateFormat = new Date(appointment.date); // new appointment date
		const cleanedDateFormat = new Date(dateFormat).toString().substring(0, 15); // cleans up date format
		return (
			<tr key={appointment.id}>
				{" "}
				{/* sets key to index (id) */}
				{/* displays user data in table data */}
				<td>{appointment.patientName}</td>
				<td>{appointment.patientLastName}</td>
				<td>{cleanedDateFormat}</td> {/* use cleaned date format */}
				<td>{appointment.time}</td>
				<td>{appointment.purpose}</td>
				<td>{appointment.phoneNumber}</td>
				<td>{appointment.medicalAid}</td>
				<td>{appointment.smoker}</td>
				<td>{appointment.type}</td>
				<td>
					<button
						onClick={toOpenEditDialog}
						value={appointment.id}
					>
						Edit
					</button>{" "}
					{/* opens edit dialog to edit appointment */}
					<form>
						<button
							type="submit"
							onClick={(e) => handleDeleteAppointment(e, appointment.id)}
						>
							Delete
						</button>{" "}
						{/* deletes appointment */}
					</form>
				</td>
			</tr>
		);
	});

	return (
		<div data-testid="AdminDashboardTest">
			{" "}
			{/* testing id */}
			<Row>
				<Col md={2}>
					{" "}
					{/* column 2/12 */}
					<CreateNewAppointment />
				</Col>
				<Col md={10}>
					{" "}
					{/* column 10/12 */}
					<Link to={"/create-new-admin"}>
						{" "}
						{/* link to create admin page */}
						<button className="create-new-admin">Create new admin</button>
					</Link>
					<button
						className="sign-out"
						onClick={handleSignout}
					>
						Sign-out
					</button>{" "}
					{/* signs admin out */}
					<MDBTable hover>
						<MDBTableHead className="tablehead">
							<tr>
								{" "}
								{/* setting up table headings */}
								<th>Patient First Name</th>
								<th>Patient Last Name</th>
								<th>Date</th>
								<th>Time</th>
								<th>Purpose</th>
								<th>Phone number</th>
								<th>Medical Aid</th>
								<th>Smoker</th>
								<th>Type</th>
								<th>Action</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody>
							{adminData}{" "}
							<Dialog
								open={open}
								onClose={closeEditDialog}
							>
								{" "}
								{/* opens edit dialog and closes it */}
								<DialogTitle>Edit appointment</DialogTitle>
								<DialogContent>
									<form
										onSubmit={handleEditAppointment}
										className="container"
									>
										<TextField
											required
											label="patient name"
											onChange={(e) => setUpdatedName(e.target.value)}
											fullWidth
										/>
										{/* sets on change to useState (the state targets the value entered) */}
										{/* sets value to state */}
										<TextField
											required
											label="patient surname"
											onChange={(e) => setUpdatedLastName(e.target.value)}
											fullWidth
										/>
										{/* sets on change to useState (the state targets the value entered) */}
										{/* sets value to state */}
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												required
												label="date"
												value={updatedDate}
												onChange={handleUpdatedDate}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<TimePicker
												required
												label="time"
												value={updatedTime}
												onChange={handleUpdatedTime}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
										<TextField
											required
											label="purpose"
											value={updatedPurpose}
											onChange={(e) => setUpdatedPurpose(e.target.value)}
											fullWidth
										/>
										{/* sets on change to useState (the state targets the value entered) */}
										{/* sets value to state */}
										<TextField
											required
											label="phone number"
											onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
											fullWidth
										/>
										{/* sets on change to useState (the state targets the value entered) */}
										{/* sets value to state */}
										<FormControl
											fullWidth
											required
										>
											<InputLabel>Medical Aid</InputLabel>
											<Select
												label="Medical aid"
												onChange={(e) => setUpdatedMedicalAid(e.target.value)}
												value={updatedMedicalAid}
												fullWidth
											>
												{/* sets on change to useState (the state targets the value entered) */}
												{/* sets value to state */}
												<MenuItem value={"Yes"}>Yes</MenuItem>
												<MenuItem value={"No"}>No</MenuItem>
											</Select>{" "}
											{/* dropdown menu */}
										</FormControl>
										<FormControl
											fullWidth
											required
										>
											<InputLabel>Smoker</InputLabel>
											<Select
												label="Smoker"
												onChange={(e) => setUpdatedSmoker(e.target.value)}
												value={updatedSmoker}
												fullWidth
											>
												{/* sets on change to useState (the state targets the value entered) */}
												{/* sets value to state */}
												<MenuItem value={"Yes"}>Yes</MenuItem>
												<MenuItem value={"No"}>No</MenuItem>
											</Select>{" "}
											{/* dropdown menu */}
										</FormControl>
										<FormControl
											fullWidth
											required
										>
											<InputLabel>Type</InputLabel>
											<Select
												label="Type"
												onChange={(e) => setUpdatedType(e.target.value)}
												value={updatedType}
											>
												{/* sets on change to useState (the state targets the value entered) */}
												{/* sets value to state */}
												<MenuItem value={"Emergency"}>Emergency</MenuItem>
												<MenuItem value={"Urgent"}>Urgent</MenuItem>
												<MenuItem value={"Minor"}>Minor</MenuItem>
												<MenuItem value={"Checkup"}>Checkup</MenuItem>
											</Select>{" "}
											{/* dropdown menu */}
										</FormControl>

										<button
											className="cancel"
											onClick={closeEditDialog}
										>
											Cancel
										</button>
										{/* closes dialog */}
										<button
											className="save-changes"
											type="submit"
										>
											Save changes
										</button>
										{/* saves changes and closes dialog */}
									</form>
								</DialogContent>
							</Dialog>
						</MDBTableBody>
					</MDBTable>
				</Col>
			</Row>
		</div>
	);
};

export default AdminDashboard;
