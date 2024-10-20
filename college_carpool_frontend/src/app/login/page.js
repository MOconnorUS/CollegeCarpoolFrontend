
'use client'; // Ensure this is at the top

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js 13+

export default function TextBoxPage() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const router = useRouter(); // Ensure correct import

  const handleInputChange1 = (event) => setInputValue1(event.target.value);
  const handleInputChange2 = (event) => setInputValue2(event.target.value);

  const handleBackToHome = () => {
    router.push('/');
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    const formData = {
      username: inputValue1,
      password: inputValue2,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/accounts/login', formData);
      console.log(response.status);
      console.log(response.data);

      if (response.status === 200) {
        setMessage('Account created successfully! Redirecting...');
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        router.push('/profile'); // Redirecting to the profile page
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
            placeholder="asldfjoij3"
            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
          />
        </div>
        <button type="submit" style={{ marginLeft: '10px', padding: '5px' }} disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button 
            onClick={handleBackToHome}
            style={{ marginTop: '10px', padding: '5p' }}>Back to Rides</button>
    </div>
     );
    }    
