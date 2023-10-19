import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/createNewAdmin.css";

const CreateNewAdmin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		//checks if user is signed in
		const token = localStorage.getItem("token"); // gets user token
		if (token) {
			const user = jwt_decode(token); //decode jwt token
			if (!user) {
				// if the user is not registered
				localStorage.removeItem("token"); // removes user token if user does not have access to the page
				window.location.href = "/admin-login"; // takes user to login page if user is not signed in
			}
		}
	}, []); // useEffect only runs once

	const createNewAdmin = async (e) => {
		e.preventDefault(); // prevents page from reloading
		const response = await fetch("/login/create-new-admin", {
			//fetches path
			method: "POST", //makes post request
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				// sets json object to state values
				username,
				password,
			}),
		});
		const data = await response.json(); //waits for json response
		if (data.status === "ok") {
			// if data status from backend and frontend is read as 'ok'
			alert("new admin created"); // the new admin is created
			window.location.href = "/admin-dashboard"; //admin is then taken to admin dashboard
		} else {
			alert("Something went wrong please retry."); // else the user has to retry
		}
	};

	return (
		<div
			data-testid="CreateNewAdminTest"
			className="main-container-admin-create"
		>
			<form
				onSubmit={createNewAdmin}
				className="new-admin-container"
			>
				{" "}
				{/* on submit the form will run */}
				<h1 className="new-admin-heading">Create new admin</h1>{" "}
				{/* main heading */}
				<label className="label1">Username:</label>
				<input
					className="input1"
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				></input>
				{/* targeted value is set to state value */}
				{/* onChange the useState will target the value entered by the user */}
				<br />
				<br />
				<label className="label2">Password:</label>
				<input
					className="input2"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
					type="password"
				></input>
				{/* targeted value is set to state value */}
				{/* onChange the useState will target the value entered by the user */}
				<br />
				<br />
				<button
					className="new-admin-button"
					type="submit"
				>
					Submit
				</button>
				{/* submit button */}
				<Link to={"/admin-dashboard"}>
					<p className="link-to-dashboard">Go back to admin dashboard</p>
				</Link>
				{/* takes new admin to dashboard */}
			</form>
		</div>
	);
};

export default CreateNewAdmin;
