import React, { useContext, useEffect, } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        } else{
            actions.private()
        }}, [])

    return (
        <div className='sign-form'>
            <h2>Hello, how are you {store.profile? store.profile : "Loading..."}</h2>
        </div>
    );
};

export default Private;


