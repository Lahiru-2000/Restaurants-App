
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../Assets/recipe_logo.png'
import './Login.css'
import { useState } from 'react';
import axios from 'axios';


import TextField from '@mui/material/TextField';

const Login = () => {
    
   
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const result = await axios.post('http://localhost:3005/api/login', {
                
                Email,
                Password
            })
            .then(result => {
                console.log(result.data);
                if(result.data == "success"){
                   console.log("nice")
                   
                }
            })
            
            

        }
    
        catch (err) {
            console.error("login failed");
    }

    }





  return (
    <div className='container-fluid login-container'>
        <div className='login-form' >
        {/* onSubmit={handleSubmit} */}
            <div className='login-logo-div'>
                <img src={logo} className='logo'/>
                

            </div>
            <h2 className='login-text'>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className='all-login-inputs'>
                <div className='field-holder'>
                    
                    <TextField
                            required
                            type='email'
                            id="outlined-required-log"
                            label="Email Address"
                         
                          

                            onChange={(e) => {
                                setEmail(e.target.value);


                               
                                
                            }}
                            
                            
                        />
                        
                </div>
                <div className='field-holder'>
                   
                    <TextField
                            required
                            type='password'
                            id="outlined-required-log"
                            label="Password"
                           
                         
                        onChange={(e) => {
                            setPassword(e.target.value);
                         
                        }}
                        />
                  
                </div>
                
            </div>
            <div className='sign-in'>
                <button className='sign-in-button' type='submit'   >SIGN IN</button>
                {/* onClick={() => navigate("/Home")} */}
                
            </div>
            </form>

            <div className='login-create-account'>
                <span>Don't have an account? <a href='' className='create-account' >Create an account</a></span> 
                {/* onClick={() => navigate("/Home")} */}
            </div>
        </div>
    </div>
  )
}

export default Login
