//imports
import React from "react";
import { useState } from "react";
import {
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "../css/createNewAppointment.css";
//useState states
const CreateNewAppointment = () => {
	const [patientName, setPatientName] = useState("");
	const [patientLastName, setPatientLastName] = useState("");
	const [date, setDate] = useState(null);
	const [time, setTime] = useState("");
	const [purpose, setPurpose] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [medicalAid, setMedicalAid] = useState("");
	const [smoker, setSmoker] = useState("");
	const [type, setType] = useState("");
	// handles all new appointments added and posts the new appointment to the back-end and fetches the
	// back-end results to display on the front-end
	const handleAppointments = async (e) => {
		e.preventDefault();
		fetch("/app/add-appointment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			}, // set new appointment values to the state values as a json object
			body: JSON.stringify({
				patientName,
				patientLastName,
				date,
				time,
				purpose,
				phoneNumber,
				medicalAid,
				smoker,
				type,
			}),
		});
		window.location.href = "/admin-dashboard"; // refreshes dashboard to display added appointment
	};

	return (
		<div data-testid="CreateNewAppointmentTest">
			<form
				onSubmit={handleAppointments}
				className="new-patient-container"
			>
				<h3 className="main-heading">New appointment:</h3> {/* main heading */}
				<TextField
					required
					label="patient name"
					onChange={(e) => setPatientName(e.target.value)}
					className="new-patientName"
				/>{" "}
				{/* sets on change to useState (the state targets the value entered) */}
				{/* sets value to state */}
				<TextField
					required
					label="patient surname"
					onChange={(e) => setPatientLastName(e.target.value)}
					className="patient-surname"
				/>{" "}
				{/* sets on change to useState (the state targets the value entered) */}
				{/* sets value to state */}
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						required
						label="date"
						value={date}
						onChange={(selectedDate) => setDate(selectedDate)}
						renderInput={(params) => <TextField {...params} />}
						// accesses the date selected and sets new date parameters to the
						//value selected by user by using syntax '...'
						className="date"
					/>{" "}
					{/* sets on change to useState (the state targets the value entered) */}
					{/* sets value to state */}
				</LocalizationProvider>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<TimePicker
						required
						label="time"
						value={time}
						className="time"
						onChange={(selectedTime) => {
							const stringifyTime = selectedTime.toString(); //turns object to string
							const cleanedTime = stringifyTime.substring(16, 21); // returns the values needed
							setTime(cleanedTime);
						}}
						renderInput={(params) => <TextField {...params} />}
						// accesses the time selected and sets new time parameters to the
						//value selected by user by using syntax '...'
					/>{" "}
					{/* sets on change to useState (the state targets the value entered) */}
					{/* sets value to state */}
				</LocalizationProvider>
				<TextField
					required
					label="purpose"
					onChange={(e) => setPurpose(e.target.value)}
					className="purpose"
				/>{" "}
				{/* sets on change to useState (the state targets the value entered) */}
				{/* sets value to state */}
				<TextField
					required
					label="phone number"
					onChange={(e) => setPhoneNumber(e.target.value)}
					className="phone-number"
				/>{" "}
				{/* sets on change to useState (the state targets the value entered) */}
				{/* sets value to state */}
				<FormControl
					fullWidth
					required
				>
					<InputLabel>Medical Aid</InputLabel>
					<Select
						label="Medical aid"
						onChange={(e) => setMedicalAid(e.target.value)}
						value={medicalAid}
						className="medical-aid"
					>
						<MenuItem value={"Yes"}>Yes</MenuItem>
						<MenuItem value={"No"}>No</MenuItem>
					</Select>{" "}
					{/* dropdown list */}
				</FormControl>
				<FormControl
					fullWidth
					required
				>
					{" "}
					{/* sets on change to useState (the state targets the value entered) */}
					{/* sets value to state */}
					<InputLabel>Smoker</InputLabel>
					<Select
						label="Smoker"
						onChange={(e) => setSmoker(e.target.value)}
						value={smoker}
						className="smoker"
					>
						<MenuItem value={"Yes"}>Yes</MenuItem>
						<MenuItem value={"No"}>No</MenuItem>
					</Select>{" "}
					{/* dropdown list */}
				</FormControl>
				<FormControl
					fullWidth
					required
				>
					{" "}
					{/* sets on change to useState (the state targets the value entered) */}
					{/* sets value to state */}
					<InputLabel>Type</InputLabel>
					<Select
						label="Type"
						onChange={(e) => setType(e.target.value)}
						value={type}
						className="type"
					>
						<MenuItem value={"Emergency"}>Emergency</MenuItem>
						<MenuItem value={"Urgent"}>Urgent</MenuItem>
						<MenuItem value={"Minor"}>Minor</MenuItem>
						<MenuItem value={"Checkup"}>Checkup</MenuItem>
					</Select>{" "}
					{/* dropdown list */}
				</FormControl>
				{/* sets on change to useState (the state targets the value entered) */}
				{/* sets value to state */}
				<button
					type="submit"
					className="create-button"
				>
					{" "}
					{/* submit button */}
					Create appointment
				</button>
			</form>
		</div>
	);
};

export default CreateNewAppointment;
