import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../Assets/recipe_logo.png'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()


        try{
            const result = await axios.post('http://localhost:3005/api/AddUser', {
                Fname,
                Lname,
                Email,
                Phone,
                Password
            });
            console.log(result.data);
            
         

        }
    
        catch (err) {
            console.error(err);
    }

    }

    // const navigate = useNavigate();


  return (
    <div className='container-fluid Register-container'>
        <div className='register-form ' >
            <div className='login-logo-div'>
                <img src={logo} className='logo'/>
                

            </div>

            <h2 className='login-text'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='all-register-inputs'>

                    <div className='field-holder-register'>
                        <TextField
                                required
                                id="outlined-required"
                                label="Your Name"
                                placeholder='First Name'
                                focused

                                onChange={(e) => {
                                    setFname(e.target.value);
                                }}
                            />
                        <TextField
                                
                                id="outlined-required"
                                label=""
                                placeholder='Last Name'
                                focused
                                onChange={(e) => {
                                    setLname(e.target.value);
                                }}
                            />
                    </div>
                    <div className='field-holder-register'>
                        <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                focused

                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        <TextField
                                required
                                id="outlined-required"
                                label="Phone Number"
                                focused

                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                    </div>
                    <div className='field-holder-register'>
                        <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                focused

                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        <TextField
                                required
                                id="outlined-required"
                                label="Confirm Password"
                                focused
                            />
                    </div>

                    
                </div>
           
            <div className='sign-in'>
                <button className='sign-up-button' type='submit' onSubmit={handleSubmit}>Create Account</button>
            </div>
            </form>
            <div className='login-create-account'>
                <span>Already have an account? <a href='' className='create-account' >Login</a></span>
                {/* onClick={() => navigate("/")} */}
            </div>
        </div>
    </div>
  )
}

export default Register