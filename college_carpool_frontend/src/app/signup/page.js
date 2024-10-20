
'use client'; // Ensure this is at the top

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js 13+

export default function TextBoxPage() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const router = useRouter(); // Ensure correct import

  const handleInputChange1 = (event) => setInputValue1(event.target.value);
  const handleInputChange2 = (event) => setInputValue2(event.target.value);
  const handleInputChange3 = (event) => setInputValue3(event.target.value);
  const handleInputChange4 = (event) => setInputValue4(event.target.value);
  const handleInputChange5 = (event) => setInputValue5(event.target.value);
  const handleInputChange6 = (event) => setInputValue6(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    const formData = {
      firstName: inputValue1,
      lastName: inputValue2,
      username: inputValue3,
      email: inputValue4,
      password: inputValue5,
      phoneNumber: inputValue6,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/accounts', formData);
      console.log(response.status);
      console.log(response.data);

      if (response.status === 200) {
        setMessage('Account created successfully! Redirecting...');
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        router.push('/profile');
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error(err);
        setError('Network Error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="textInput1">First Name:</label>
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
          <label htmlFor="textInput2">Last Name:</label>
          <input
            type="text"
            id="textInput2"
            value={inputValue2}
            onChange={handleInputChange2}
            placeholder="Bruscino"
            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
          />
        </div>
        <div>
          <label htmlFor="textInput3">Username:</label>
          <input
            type="text"
            id="textInput3"
            value={inputValue3}
            onChange={handleInputChange3}
            placeholder="JohnnyB"
            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
          />
        </div>
        <div>
          <label htmlFor="textInput4">School Email:</label>
          <input
            type="text"
            id="textInput4"
            value={inputValue4}
            onChange={handleInputChange4}
            placeholder="someone.#@buckeyemail.osu.edu"
            style={{ marginLeft: '10px', padding: '5px', color: 'black', width: '260px' }}
          />
        </div>
        <div>
          <label htmlFor="textInput5">Password:</label>
          <input
            type="password" // Changed to password type for better security
            id="textInput5"
            value={inputValue5}
            onChange={handleInputChange5}
            placeholder="aslfk@j3"
            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
          />
        </div>
        <div>
          <label htmlFor="textInput6">Phone Number:</label>
          <input
            type="text"
            id="textInput6"
            value={inputValue6}
            onChange={handleInputChange6}
            placeholder="333-333-3333"
            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
          />
        </div>
        <button type="submit" style={{ marginLeft: '10px', padding: '5px' }} disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}


