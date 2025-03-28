import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Users!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<Link to="/signup">
				<button type="button" class="btn btn-primary">Register in our academy</button>
			</Link>

		</div>
	);
};
