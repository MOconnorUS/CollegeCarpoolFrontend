
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
    const router = useRouter(); // Initialize the router
    const [user, setUser] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // Loading state
    const [showCarForm, setShowCarForm] = useState(false); // State to show/hide car form
    const [carMake, setCarMake] = useState(''); // State for car make
    const [carModel, setCarModel] = useState(''); // State for car model
    const [carLicensePlate, setCarLicensePlate] = useState(''); // State for car license plate
    const [carColor, setCarColor] = useState(''); // State for car color
    const [userCars, setUserCars] = useState([]); // State to hold user's cars
    const [error, setError] = useState(''); // State for error messages
    const [message, setMessage] = useState(''); // State for success messages

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Retrieve user data from local storage
        const storedCars = localStorage.getItem('userCars'); // Retrieve user cars from local storage

        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set user data
        }
        if (storedCars) {
            setUserCars(JSON.parse(storedCars)); // Parse and set user cars data
        }
        setLoading(false); // Stop loading after data retrieval
    }, []);

    const fetchCars = async (username) => {

        try{
            const response = await axios.get('http://localhost:8000/api/car/getCars', { params: { username } });

            if (response.status === 200) {
                const cars = reponse.data;
                setUsersCars(response.data);
                localStorage.setItem('userCars',JSON.stringify(cars));
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddCar = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (carMake && carModel && carLicensePlate && carColor) {
            const carData = {
                username: user ? user.username : '', // Ensure user is defined
                make: carMake,
                model: carModel,
                licensePlate: carLicensePlate,
                color: carColor,
            };

            try {
                const response = await axios.post('http://localhost:8000/api/car', carData);
                if (response.status === 200) {
                    setMessage('Car added successfully!');
                    setError('');
                    console.log(response.data);
                    
                    fetchCars(user.username);
                    // Add the new car to userCars state
                    const newCar = { make: carMake, model: carModel, licensePlate: carLicensePlate, color: carColor };
                    const updatedCars = [...userCars, newCar];
                    setUserCars(updatedCars);
                    
                    // Store updated cars in local storage
                    localStorage.setItem('userCars', JSON.stringify(updatedCars));

                    // Reset form fields
                    setCarMake('');
                    setCarModel('');
                    setCarLicensePlate('');
                    setCarColor('');
                    setShowCarForm(false); // Hide form after submission
                } else {
                    setError('Failed to add car');
                }
            } catch (err) {
                console.error('Error adding car:', err);
                setError('Failed to add the car. Try again.');
            }
        }
    };

    const handleRemoveCar = (index) => {
        // Remove the car at the specified index
        const updatedCars = userCars.filter((_, i) => i !== index);
        setUserCars(updatedCars);

        // Update local storage
        localStorage.setItem('userCars', JSON.stringify(updatedCars));
    };

    const handleBackToHome = () => {
        router.push('/');
      }

    const handleLogout = () => {
        // Clear user and car data from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('userCars');
        // Redirect to the login page
        router.push('/login'); 
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (!user) {
        return <p>No user data found. Please log in.</p>; // Message if no user data is found
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Profile Page</h1>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>

            <h2>User Cars</h2>
            
            {userCars.length === 0 ? (
                <p>No cars added yet.</p>
            ) : (
                <ul>
                    {userCars.map((car, index) => (
                        <li key={index}>
                            {car.color} {car.make} {car.model} - {car.licensePlate}
                            <button 
                                onClick={() => handleRemoveCar(index)} 
                                style={{
                                    marginLeft: '10px',
                                    padding: '5px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}>
                                Remove Car
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Button to toggle car form */}
            <button
                onClick={() => setShowCarForm(!showCarForm)}
                style={{
                    padding: '10px 15px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '10px',
                }}
            >
                {showCarForm ? 'Cancel' : 'Add a Car'}
            </button>

            {showCarForm && (
                <form onSubmit={handleAddCar} style={{ marginBottom: '20px' }}>
                    <div>
                        <label htmlFor="carMake">Car Make:</label>
                        <input
                            type="text"
                            id="carMake"
                            value={carMake}
                            onChange={(e) => setCarMake(e.target.value)}
                            required
                            placeholder="e.g. Toyota"
                            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="carModel">Car Model:</label>
                        <input
                            type="text"
                            id="carModel"
                            value={carModel}
                            onChange={(e) => setCarModel(e.target.value)}
                            required
                            placeholder="e.g. Corolla"
                            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="carLicensePlate">License Plate:</label>
                        <input
                            type="text"
                            id="carLicensePlate"
                            value={carLicensePlate}
                            onChange={(e) => setCarLicensePlate(e.target.value)}
                            required
                            placeholder="e.g. ABC1234"
                            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="carColor">Color:</label>
                        <input
                            type="text"
                            id="carColor"
                            value={carColor}
                            onChange={(e) => setCarColor(e.target.value)}
                            required
                            placeholder="e.g. Red"
                            style={{ marginLeft: '10px', padding: '5px', color: 'black' }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            marginTop: '10px',
                            padding: '10px 15px',
                            backgroundColor: 'blue',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Add Car
                    </button>
                </form>
            )}

        <button 
            onClick={handleBackToHome}
            style={{ marginTop: '10px', padding: '5p' }}>Back to Rides</button>

            {/* Big Red Logout Button */}
            <button
                onClick={handleLogout}
                style={{
                    marginTop: '20px',
                    padding: '15px 20px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    width: '100%',
                }}
            >
                Logout
            </button>
            {error && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {message && <div className="message" style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
        </div>
    );
}

