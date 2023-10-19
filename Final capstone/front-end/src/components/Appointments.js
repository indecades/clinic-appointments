//imports
import React from "react";
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import "../css/appointments.css";

const Appointments = () => {
	//useState states
	const [userAppointments, setUserAppointments] = useState([]);
	// useEffect
	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const response = await fetch("/app/user-appointments"); //fetches path
				const appointments = await response.json(); //waits for json response
				setUserAppointments(appointments); // sets state to json response
			} catch (error) {
				console.log(error); //logs error in console
			}
		};
		fetchAppointments(); //calls function to run
	}, []); // useEffect only runs once (prevents useEffect from running constantly)

	const appointmentRows = userAppointments.map((appointment) => {
		//maps through users appointments
		const dateFormat = new Date(appointment.date); //created date format
		const cleanedDateFormat = dateFormat.toDateString().substring(0, 15); // cleans up date format to display neater
		return (
			<tr>
				{" "}
				{/* returns user data to display in the table data */}
				<td className="td-patient-name">{appointment.patientName}</td>
				<td className="td-patient-lastName">{appointment.patientLastName}</td>
				<td className="td-date">
					{cleanedDateFormat} {/* uses neater date */}
				</td>
				<td className="td-time">{appointment.time}</td>
				<td className="td-type">{appointment.type}</td>
			</tr>
		);
	});

	return (
		<div
			data-testid="AppointmentsTest"
			className="appointments-container"
		>
			{" "}
			{/* testing id */}
			<Link to={"/admin-login"}>
				{" "}
				<button className="login-as-admin-button">Login as admin</button>{" "}
			</Link>
			{/* takes user to admin login page */}
			<MDBTable>
				<MDBTableHead>
					<tr>
						{" "}
						{/* creates table layout using headings <th> (table heading) */}
						<th>Patient first name</th>
						<th>Patient last name</th>
						<th>Date</th>
						<th>Time</th>
						<th>Type</th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{appointmentRows}{" "}
					{/* appointments created in first returns table data */}
				</MDBTableBody>
			</MDBTable>
		</div>
	);
};

export default Appointments;
