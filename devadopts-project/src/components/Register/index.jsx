import React, {useState} from 'react';
import './Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username:'',
        password: '',
        repeat_Password: '',
        postcode: '',
        admin: false
      });

    const [errorPostCode, setErrorPostCode] = useState(false);
    const [errorPasswordMatch, setPasswordMatch] = useState(false);

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        validatePostcode();
        validatePasswordMatch();
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            username:'',
            password: '',
            repeat_Password: '',
            postcode: '',
            admin: false
          })
      };
    
    const validatePostcode =()=>{
        const ukPostcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
        if (!ukPostcodePattern.test(formData.postcode)) {
            setErrorPostCode(true)
          } 
        else  {
            setErrorPostCode(false); 
        }
      };

    const validatePasswordMatch =()=>{
        if (formData.password !== formData.repeat_Password) {
            setPasswordMatch(true);
          } 
        else  {
            setPasswordMatch(false); 
        }
      };

  return (
    <div className='container-register'>
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
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder='Username'
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
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                placeholder='Postcode'
                />
            </div>
            <span>{errorPostCode && <p style={{ color: 'red' }}>Please enter correct postcode</p>}
                    {errorPasswordMatch && <p style={{ color: 'red' }}>Passwords donot match</p>}
            </span>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}
