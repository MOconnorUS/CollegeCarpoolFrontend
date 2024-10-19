// src/app/textbox/page.js
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function TextBoxPage() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const [loading, setLoading] = useState(false);
  const[error, setError] = useState(null);

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setError(null);

    const formData = {
        userName: inputValue1,
        password: inputValue2,
      };
    
      try {
        const response = await axios.post('http://localhost:5000/api/accounts/login', formData);
        console.log(response.data);
        alert('Account create successfully!');
      } catch (err) {
        console.error(err);
        setError('Incorrect username or password.');
      } finally {
        setLoading(false);
      }
  };

//   const formData = {
//     firstName: inputValue1,
//     lastName: inputValue2,
//     username: inputValue3,
//     email: inputValue4,
//     password: inputValue5,
//     phoneNumber: inputValue6,
//   };

//   try {
//     const response = await axios.post('http://localhost:5000/api/accounts', fromData);
//     console.log(response.data);
//     alert('Account create successfully!');
//   } catch (err) {
//     console.error(err);
//     setError('Incorrect username or password.');
//   } finally {
//     setLoading(false);
//   }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="textInput1">Username:</label>
            <input
                type="text"
                id="textInput1"
                value={inputValue1}
                onChange={handleInputChange1}
                placeholder="John"
                style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
            /> 
        </div>
        <div>
            <label htmlFor="textInput2">Password:</label>
            <input
                type="text"
                id="textInput2"
                value={inputValue2}
                onChange={handleInputChange2}
                placeholder="Bruscino"
                style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
            /> 
        </div>
        <button type="submit" style={{ marginLeft: '10px', padding: '5px' }} disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'} 
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}