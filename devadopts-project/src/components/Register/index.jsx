import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate} from 'react-router-dom';
import { userProfileContext } from '../../contexts/UserContext';

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username:'',
        password: '',
        repeat_Password: '',
        post_code: '',
        admin: false
      });

    const [errorPostCode, setErrorPostCode] = useState(false);
    const [errorPasswordMatch, setErrorPasswordMatch] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { loading, setLoading } = userProfileContext();

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validatePostcode();
        validatePasswordMatch();
        if (!errorPostCode && !errorPasswordMatch){
          setLoading(true);
          try{
            const options = {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            };
            const response = await fetch("http://localhost:3000/users/register", options);
            if (!response.ok) {
              setMessage('Unsuccessful Registration.');
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
              const data = await response.json();
              setMessage('Registered successfully.');
              setTimeout(() => {setMessage(''); navigate('/login');}, 5000);
              setFormData({
                first_name: '',
                last_name: '',
                email: '',
                username:'',
                password: '',
                repeat_Password: '',
                post_code: '',
                admin: false
              })
            }
          catch(e){
            console.log(e);
          }
          finally{
            setLoading(false)
          }}
          else{
            return
          }
      };
    
    const validatePostcode =()=>{
        const ukPostcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
        if (!ukPostcodePattern.test(formData.post_code)) {
            setErrorPostCode(true)
          } 
        else  {
            setErrorPostCode(false); 
        }
      };

    const validatePasswordMatch =()=>{
        if (formData.password !== formData.repeat_Password) {
            setErrorPasswordMatch(true);
          } 
        else  {
            setErrorPasswordMatch(false); 
        }
      };
  return (
    <div className='container-register'>
       {loading && <div className="loading">Registering user...</div>}
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder='First Name'
                required
                />
            </div>
            <div>
                <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder='Last Name'
                required
                />
            </div>
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
            <div>
                <input
                type="password"
                id="repeat_Password"
                name="repeat_Password"
                value={formData.repeat_Password}
                onChange={handleChange}
                placeholder='Retype your password'
                required
                />
            </div>
            <div>
                <input
                type="text"
                id="post_code"
                name="post_code"
                value={formData.post_code}
                onChange={handleChange}
                placeholder='Postcode'
                />
            </div>
            <span>{errorPostCode && <p style={{ color: 'red' }}>Please enter correct postcode</p>}
                    {errorPasswordMatch && <p style={{ color: 'red' }}>Passwords donot match!</p>}
            </span>
            <button type="submit">Register</button>
        </form>
        <p style={{ color: 'grey' }}>Already a user? <Link to="/login">Login</Link></p>
        <p className='message-success'>{message}</p>
    </div>
  )
}
