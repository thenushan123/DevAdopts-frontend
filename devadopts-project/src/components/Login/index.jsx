import React, {useState} from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { useProfileContext } from '../../contexts/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    const {loading, setLoading, setToken} = useProfileContext();
    const [formData, setFormData] = useState({
        email:'',
        password: ''
      });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setError('');
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
                const response = await fetch(`${process.env.REACT_URL}/users/login`, options);
                if (response.status === 200) {
                    const data = await response.json();
                    setLoading(false);
                    setError('');
                    localStorage.setItem("token", data.token);

                    setToken(data.token);

                    navigate('/home');
                }
                else {
                    setLoading(false);
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
    if (loading) return (
        <div className='loading-container-login'>
                <FontAwesomeIcon icon={faSpinner} pulse size="5x"/>;
        </div>);
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
        <span>{error && <p style={{ color: 'red' }}>Passowrd or Email id is incorrect</p>}</span>
        </form>
        <p>Are you a new user? <Link to='/Register'> Register</Link></p>
    </div>
  )
}
