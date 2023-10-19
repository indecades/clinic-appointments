import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

const Home = () => {
	return (
		<div data-testid="homepageTest">
			{" "}
			{/* testing id */}
			<Link to={"/appointments"}>
				{" "}
				<button className="view-appointment">View appointments</button>{" "}
			</Link>
			{/* link to appointment page */}
			<Link to={"/admin-login"}>
				{" "}
				<button className="admin-button">I am an admin</button>{" "}
			</Link>
			{/* link button to admin login */}
		</div>
	);
};

export default Home;
