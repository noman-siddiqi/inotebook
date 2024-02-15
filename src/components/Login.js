import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const host = "http://localhost:3100/api/auth/";
    const endpoint = "/login";
    let navigate =  useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(host + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            props.showAlert("Logged in Successfully", "success");
            navigate('/');
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }    
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="mt-3 mx-3">
            <h1 className="my-3">Login to continue to iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;
