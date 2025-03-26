import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";

import { Link, useParams, useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate()

    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: ""
    })
    const [loginError, setLoginError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataLogin({ ...dataLogin, [name]: value })
        actions.setUser({ ...store, [name]: value })
    }
    const sendData = async (e) => {
        e.preventDefault();

        if (dataLogin.email && dataLogin.password) {
            const loginSuccess = await actions.login(store.email, store.password);

            if (loginSuccess) {
                console.log("Usuario logueado correctamente.");
                navigate("/profile"); // Redirige directamente al perfil del usuario
            } else {
                setLoginError(<p className="text-danger">User or Password incorrect!</p>);
                console.log("Error: Usuario o contraseña incorrectos.");
            }
        } else {
            console.log("Faltan datos. Completa el formulario.");
        }
    };

    return (
        <div>
            <h3>Log in to your profile</h3>
            <form>
                <div className="form-floating mb-3">
                    <input type="email" name="email" className="form-control" id="floatingInput" value={store.email} onChange={handleChange} placeholder="name@example.com" />
                    <label for="floatingInput">Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" id="floatingPassword" value={store.password} onChange={handleChange} placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary mt-3"  onClick={sendData}>Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
