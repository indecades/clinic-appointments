//imports
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/adminLogin.css";

const AdminLogin = () => {
	// useState states
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// handles logins async function
	const handleLogin = async (e) => {
		e.preventDefault(); // prevents the page from reloading
		const response = await fetch("/login/admin-login", {
			// fetches file path
			method: "POST", //post request
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				//sets state value to json object
				username,
				password,
			}),
		});
		const data = await response.json(); // waits for json response
		if (data.admin) {
			// if the user is logged in their jwt token is set in local storage
			localStorage.setItem("token", data.admin);
			alert(`Successfully logged in.`); // user is logged in
			window.location.href = "/admin-dashboard";
		} else {
			// if user entered information incorrectly
			alert(`Please retry username or password!`);
		}
	};
	// useEffect
	useEffect(() => {
		const createDefaultAdmin = async () => {
			await fetch("/login/create-default-admin", {
				// fetches file path
				method: "POST", //makes post request
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					// sets states to json object
					username: "admin",
					password: "admin",
				}),
			});
		};
		if (localStorage.getItem("token")) {
			// if local storage gets token
			window.location.href = "/admin-dashboard"; // take user to admin dashboard
		} else {
			createDefaultAdmin(); // create default admin
		}
	}, []); // useEffect only runs once

	return (
		<div
			data-testid="adminLoginTest"
			className="admin-login-box"
		>
			<form
				onSubmit={handleLogin}
				className="admin-login-container"
			>
				<h3 className="admin-login-main-heading">Admin login</h3>
				<br /> {/* if form is submitted function will run */}
				<label className="admin-label">Username:</label>{" "}
				{/* user enters email and value is set to useState */}
				<input
					className="admin-input"
					value={username}
					required
					placeholder="Enter your username"
					onChange={(e) => setUsername(e.target.value)}
				></input>
				<br />
				<br />
				<label className="admin-label">Password:</label>{" "}
				{/* user enters password and value is set useState*/}
				<input
					className="admin-input"
					value={password}
					required
					placeholder="Enter your password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<br />
				<br />
				<button
					className="admin-login-button"
					type="submit"
				>
					Submit
				</button>
				<br />
				<Link to={"/appointments"}>
					<p className="admin-login-link">Go back to appointments?</p>
				</Link>
				{/* if user does not have an account they can easily be redirected to register page */}
			</form>
		</div>
	);
};

export default AdminLogin;
