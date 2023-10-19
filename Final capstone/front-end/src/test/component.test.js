import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import AdminDashboard from "../components/AdminDashboard";
import AdminLogin from "../components/AdminLogin";
import Appointments from "../components/Appointments";
import CreateNewAdmin from "../components/CreateNewAdmin";
import CreateNewAppointment from "../components/CreateNewAppointment";
import { MemoryRouter } from "react-router-dom";
// tests home page {passed}
it("Renders the home page", () => {
	render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
	const homeElement = screen.getByTestId("homepageTest");
});
// tests admin dashboard page {passed}
it("Renders the admin dashboard page", () => {
	render(
		<MemoryRouter>
			<AdminDashboard />
		</MemoryRouter>
	);
	const homeElement = screen.getByTestId("AdminDashboardTest");
});
// tests admin login page {passed}
it("Renders the admin login page", () => {
	render(
		<MemoryRouter>
			<AdminLogin />
		</MemoryRouter>
	);
	const homeElement = screen.getByTestId("adminLoginTest");
});
// tests appointment page {passed}
it("Renders the appointments page", () => {
	render(
		<MemoryRouter>
			<Appointments />
		</MemoryRouter>
	);
	const homeElement = screen.getByTestId("AppointmentsTest");
});
// tests create new admin page {passed}
it("Renders the create new admin page", () => {
	render(
		<MemoryRouter>
			<CreateNewAdmin />
		</MemoryRouter>
	);
	const homeElement = screen.getByTestId("CreateNewAdminTest");
});
// tests create new create new appointment page {passed}
it("Renders the create new appointment page", () => {
	render(
		<MemoryRouter>
			<CreateNewAppointment />
		</MemoryRouter>
	);
	const homeElement = screen.getByTestId("CreateNewAppointmentTest");
});
