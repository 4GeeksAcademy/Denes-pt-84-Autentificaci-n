import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";



export const SignUp = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: ""
    })

    const [errorData, setErrorData] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })

        actions.setUser({ ...store, [name]: value })
    }
    console.log(userData)
    const sendData = (e) => {
        e.preventDefault()

        actions.register(userData)
        console.log('datos enviados')

        // if (store.email && store.password && store.name) {
        //     if (!validateEmail(userData.email)) {
        //         setErrorData(<p className="text-danger">Formato de email inválido.</p>)
        //         return;
        //     } else {
        //         try {
        //             const registerSuccess = await actions.register(store.email, store.password, store.name)

        //             if (registerSuccess) {
        //                 const loginSuccess = await actions.login(store.email, store.password)

        //                 if (loginSuccess) {
        //                     console.log("Usuario registrado y logueado correctamente.")
        //                     actions.clearUser()
        //                     navigate("/registerData")
        //                 } else {
        //                     console.log("Error al iniciar sesión después del registro.")
        //                 }
        //             }
        //         } catch (error) {
        //             setErrorData(<p className="text-danger">Already registered email.</p>)
        //             console.error("Error en el proceso de registro/login:", error)
        //         }
        //     }
        // } else {
        //     setErrorData(<p className="text-danger">Required fields.</p>)
        // }
    };

    // const validateEmail = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //     return emailRegex.test(email)
    // }

    useEffect(() => {
        if (store.email === "" && store.password === "" && store.name === "") {
            setUserData({ email: "", password: "", name: "" })
        }
    }, [store.email, store.password, store.name])


    return (
        <div className='sign-form'>
            <h3>Complete the form to create your account</h3>
            <form>
                <div className="form-floating mb-3">

                    <input type="name" name="name" className="form-control" id="floatingInput1" value={userData.name} onChange={handleChange} />
                    <label for="floatingInput">Name</label>

                </div>
                <div className="form-floating mb-3">

                    <input type="email" name="email" className="form-control" id="floatingInput" value={userData.email} onChange={handleChange} placeholder="name@example.com" />
                    <label for="floatingInput">Email</label>

                </div>
                <div className="form-floating">

                    <input type="password" name="password" className="form-control" id="floatingPassword" value={userData.password} onChange={handleChange} placeholder="Password" />
                    <label for="floatingPassword">Password</label>

                </div>
                <button type="submit" className="btn btn-success" onClick={sendData} >Create Account</button>
            </form>
        </div>
    );
};

export default SignUp;

