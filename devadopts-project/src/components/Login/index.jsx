import React, {useState} from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password: ''
      });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit=async (e)=>{
        setError('');
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return;
        }
        else {
            try{
                const options = {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
                const response = await fetch("http://localhost:3000/users/login", options);
    
                if (response.status == 200) {
                    const data = await response.json();
                    setError('');
                    localStorage.setItem("token", data.token);
                    navigate('/home');
                } 
            }
            catch(e){
                setError(e);
                console.log(e)
            }
        }
    }

  return (
    <div className='container-login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                required
            />
        </div>
        <div>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                required
            />
        </div>
        <button type="submit">Login</button>
        <p>{error}</p>
        </form>
        <p>Are you a new user? <Link to='/'> Register</Link></p>
    </div>
  )
}
