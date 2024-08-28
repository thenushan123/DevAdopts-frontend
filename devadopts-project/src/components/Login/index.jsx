import React, {useState} from 'react';
import './Login.css';

export default function Login() {
    const [formData, setFormData] = useState({
        username:'',
        password: ''
      });

    const [error, setError] = useState('');

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit=(e)=>{
        setError('');
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError('Username and password are required');
            return;
        }
        else if (formData.username === "reebu" && formData.password === "reebu") {
            setError('Success');
            return;
        }
        else{
            setError('Fail')
            return;
        }
    }

  return (
    <div className='container-login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder='Username'
            required
        />
        <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
            required
        />
        <button type="submit">Login</button>
        </form>
    </div>
  )
}
