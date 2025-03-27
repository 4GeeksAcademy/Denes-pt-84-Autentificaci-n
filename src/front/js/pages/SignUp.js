import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signUp.css";



export const SignUp = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",

    })

    const [errorData, setErrorData] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    console.log(userData)
    const sendData = async (e) => {
        e.preventDefault();
        const success = await actions.register(userData);
        if (success) {
            navigate("/login");
        } else {
            setErrorData("this user already exists");
        }
    };

    useEffect(() => {
        if (store.email === "" && store.password === "" && store.name === "") {
            setUserData({ name: "", email: "", password: "" })
        }
    }, [store.name, store.password, store.email])


    return (
        <div className='sign-form'>
            <h3>Complete the form to create your account</h3>
            {errorData && <p className="text-danger">{errorData}</p>}
            <form>
                <div className="form-floating mb-3">

                    <input type="text" name="name" className="form-control" id="floatingInput1" value={userData.name} onChange={handleChange} />
                    <label for="floatingInput1">Name</label>

                </div>
                <div className="form-floating mb-3">

                    <input type="email" name="email" className="form-control" id="floatingInput" value={userData.email} onChange={handleChange} placeholder="name@example.com" />
                    <label for="floatingInput">Email</label>

                </div>
                <div className="form-floating">

                    <input type="password" name="password" className="form-control" id="floatingPassword" value={userData.password} onChange={handleChange} placeholder="Password" />
                    <label for="floatingPassword">Password</label>

                </div>
                <div className='buttons'>
                    <button type="submit" className="btn btn-success mt-3" onClick={sendData} >Create Account</button>
                    <Link to="/">
                        <button className="btn btn-secondary mt-3">Home</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

