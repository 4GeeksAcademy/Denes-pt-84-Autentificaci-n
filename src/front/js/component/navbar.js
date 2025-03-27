import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context); 
	const navigate = useNavigate();

	const handleLogout = () => {
		
		actions.logout();
		navigate("/login");
	};

	const isLoggedIn = localStorage.getItem("token");

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">4Geeks Academy</span>
				</Link>
				<div className="ml-auto">
					{isLoggedIn ? (
						<>
							<button className="btn btn-danger" onClick={handleLogout}>
								Log Out
							</button>
						</>
					) : (
						<>
							<Link to="/login">
								<button className="btn btn-primary">Log In</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-secondary ml-2">Sign Up</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

