import React, {useState} from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { userProfileContext } from '../../contexts/UserContext';

export default function Login() {
    const {loading, setLoading} = userProfileContext();
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
                setLoading(true);
                const response = await fetch("http://localhost:3000/users/login", options);
                setLoading(false);
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    setError('');
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userId",data.user_id)
                    navigate('/home');
                }
                else {
                    const errorMessage = await response.text();
                    setError(errorMessage || 'Login failed. Please check your credentials and try again.');
                 }
            }
            catch(e){
                setError(e.message);
                console.log(e.message)
            }
        }
    }
    if (loading) return <div className="loading">Logging in</div>;
  return (
    <div className='container-login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <input
                type="email"
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
        <p>Are you a new user? <Link to='/Register'> Register</Link></p>
    </div>
  )
}
