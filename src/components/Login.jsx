import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { app, auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { doc, setDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        console.log('User logged in:', user);

    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
    });
}

const signup = async (email, password, name) => {
    try {
        console.log("NAME ----");
        console.log(name);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update the user's display name
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name,
        });

        // Store the user's name in the database
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            name: name,
        });
        console.log('User created:', userCredential.user);
        
        
    } catch (error) {
        console.error('Error during signup:', error.code, error.message);
    }
};


const Login = (props) => {
    const history = useNavigate(); // Use the useHistory hook


    // State for login form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // State for signup form
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    // Handler for login form input changes
    const handleLoginEmailChange = (event) => {
        setLoginEmail(event.target.value);
    };

    const handleLoginPasswordChange = (event) => {
        setLoginPassword(event.target.value);
    };

    // Handler for signup form input changes
    const handleSignupNameChange = (event) => {
        setSignupName(event.target.value);
    };

    const handleSignupEmailChange = (event) => {
        setSignupEmail(event.target.value);
    };

    const handleSignupPasswordChange = (event) => {
        setSignupPassword(event.target.value);
    };

    // Handler for form submission
    const handleLoginSubmit = (event) => {
        // const history = useNavigate();
        event.preventDefault(); // Prevent the default form submission
        console.log('Login Email:', loginEmail);
        console.log('Login Password:', loginPassword);
        login(loginEmail, loginPassword);
        history('/home');
        // Here you can handle the login form submission, e.g., send the data to a server
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log('Signup Name:', signupName);
        console.log('Signup Email:', signupEmail);
        console.log('Signup Password:', signupPassword);

        if (signupName !== "" && signupEmail !== "" && signupPassword !== "") {
            signup(signupEmail, signupPassword, signupName)
            .then(() => {
                // Log in the user after successful signup
                login(signupEmail, signupPassword);
                // Clear the form inputs
                setSignupEmail("");
                setSignupPassword("");
                setSignupName("");
                history("/home")
            })
            .catch((error) => {
                console.error('Error during signup:', error.code, error.message);
            });
        };
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <form onSubmit={handleLoginSubmit}>
                                                    <div className="form-group">
                                                        <input type="email" name="email" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" value={loginEmail} onChange={handleLoginEmailChange}/>
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="password" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" value={loginPassword} onChange={handleLoginPasswordChange}/>
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button type="submit" className="btn mt-4">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                                <form onSubmit={handleSignupSubmit}>
                                                    <div className="form-group">
                                                        <input type="text" name="name" className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off" value={signupName} onChange={handleSignupNameChange}/>
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" name="email" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" value={signupEmail} onChange={handleSignupEmailChange}/>
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="password" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" value={signupPassword} onChange={handleSignupPasswordChange}/>
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button type="submit" className="btn mt-4">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


