'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sliderValue1, setSliderValue1] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [time, setTime] = useState('');
  const [time2, setTime2] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [checkbox4Checked, setCheckbox4Checked] = useState(false);
  const [checkbox5Checked, setCheckbox5Checked] = useState(false);
  const [checkbox6Checked, setCheckbox6Checked] = useState(false);
  const [checkbox7Checked, setCheckbox7Checked] = useState(false);
  const [destination, setDestination] = useState('');
  const [needLuggage, setNeedLuggage] = useState(false);
  const [silentRide, setSilentRide] = useState(false);
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);

  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1 && checkbox1Checked == false) {
      setCheckbox1Checked(true); // Check checkbox 1
      setCheckbox2Checked(false); // Uncheck checkbox 2
    } else if (checkboxNumber === 1 && checkbox1Checked == true) {
      setCheckbox1Checked(false); // Check checkbox 1
    } 
    else if (checkboxNumber == 2 && checkbox2Checked == true) {
      setCheckbox1Checked(false); // Uncheck checkbox 1
      setCheckbox2Checked(false); // Check checkbox 2
    } else if (checkboxNumber == 2 && checkbox2Checked == false) {
      setCheckbox2Checked(true); // Check checkbox 2
    } else if (checkboxNumber == 3 && checkbox3Checked == false) {
      setCheckbox3Checked(true);
      setCheckbox4Checked(false);
      setCheckbox5Checked(false);
    } else if (checkboxNumber == 3 && checkbox3Checked == true) {
      setCheckbox3Checked(false);
    }  else if (checkboxNumber == 4 && checkbox4Checked == false) {
      setCheckbox3Checked(false);
      setCheckbox4Checked(true);
      setCheckbox6Checked(false);
    } else if (checkboxNumber == 4 && checkbox4Checked == true) {
      setCheckbox4Checked(false);
    } else if (checkboxNumber == 5 && checkbox5Checked == false) {
      setCheckbox3Checked(false);
      setCheckbox5Checked(true);
      setCheckbox6Checked(false);
    } else if (checkboxNumber == 5 && checkbox5Checked == true) {
      setCheckbox5Checked(false);
    } else if (checkboxNumber == 6 && checkbox6Checked == false) {
      setCheckbox4Checked(false);
      setCheckbox5Checked(false);
      setCheckbox6Checked(true);
    } else if (checkboxNumber == 6 && checkbox6Checked == true) {
      setCheckbox6Checked(false);
    } else if (checkboxNumber == 7 && checkbox7Checked == false){
      setCheckbox7Checked(true);
    }
    else if (checkboxNumber == 8 && needLuggage == false) {
      setNeedLuggage(true);
    } else if (checkboxNumber == 8 && needLuggage == true) {
      setNeedLuggage(false);
    }
    else if (checkboxNumber == 9 && silentRide == false) {
      setSilentRide(true);
    } else if (checkboxNumber == 9 && silentRide == true) {
      setSilentRide(false);
    }
     else {
      setCheckbox7Checked(false);
    }
  };

  const handleSliderChange1 = (event) => {
    setSliderValue1(event.target.value); // Update the slider value
  };

  const handleSliderChange2 = (event) => {
    setSliderValue2(event.target.value); // Update the slider value
  };

  const handleTimeInput = (event) => {
    setTime(event.target.value); // Update the time value on change
  };

  const handleTimeInput2 = (event) => {
    setTime2(event.target.value); // Update the time value on change
  };

  const handleSilentRide = (event) => {
    setSilentRide(event.target.value); 
  };

  const handleDestinationInput = (event) => {
    setDestination(event.target.value);
  }

  const handleLuggageFilter = (event) => {
    setNeedLuggage(event.target.value);
  }

  const toggleModal = () => {
    if (!isModalOpen) {
      // Reset all form values when the modal is opened
      setCheckbox3Checked(false);
      setCheckbox4Checked(false);
      setCheckbox5Checked(false);
      setCheckbox6Checked(false);
      setCheckbox7Checked(false);
      setSliderValue1(0);
      setSliderValue2(0);
      setDestination('');
      setTime2('');
    }
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const makePost = () => {
    const savedInfo = {
      checkbox3Checked, checkbox4Checked, checkbox5Checked, checkbox6Checked, checkbox7Checked, time2, sliderValue2, destination, isLookingForRiders : checkbox4Checked, isLookingForRide : checkbox3Checked
    }
    
    setRides([...rides, savedInfo]);
    console.log(...rides);
    toggleModal();
  } 
  
  useEffect(() => {
    const applyFilters = () => {
      let filtered = rides;

      // Filter based on ride type
      if (checkbox1Checked) {
        filtered = filtered.filter(ride => ride.isLookingForRide); // Looking for a ride
      } 
      if (checkbox2Checked) {
        filtered = filtered.filter(ride => ride.isLookingForRiders); // Looking for riders
      }

      // Filter based on seats available
      filtered = filtered.filter(ride => ride.sliderValue2 >= sliderValue1);

      // Filter based on luggage space
      if (needLuggage) {
        filtered = filtered.filter(ride => ride.checkbox5Checked); // Ride has room for luggage
      }

      // Filter based on silent ride preference
      if (silentRide) {
        filtered = filtered.filter(ride => ride.checkbox7Checked); // Wants a silent ride
      }

      // Update filtered rides
      setFilteredRides(filtered);
    };

    applyFilters();
  }, [rides, checkbox1Checked, checkbox2Checked, sliderValue1, needLuggage, silentRide]);

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[200px_1fr] min-h-screen">
      {/* Top Header */}
      <header className="col-span-2 bg-gray-200 p-6 text-center text-xl">
        <h1 className="text-2xl font-bold color-rgb(0,0,0) text-black">College Carpool</h1>
        <p className="text-black">Find the safe and cheap ride that's right for you</p>

        {/* Login/Register or Account button */}
        <div className="text-right">
          {isLoggedIn ? (
            <button className="text-blue-500 hover:underline" onClick={Router.push('/signup')}>Account</button>
          ) : (
            <>
              <a href="./login">
                <button className="text-blue-500 hover:underline">Login</button>
              </a>
              <button className="text-blue-500 hover:underline">/</button>
              <a href="./signup">
                <button className="text-blue-500 hover:underline">Register</button>
              </a>        
            </>
          )}
        </div>
        <div className="text-left">
            <button 
            className="mt-4 px-4 py-2 rounded text-white-500 bg-blue-500"
            onClick={toggleModal}
            Open Modal
            >Plan a Ride</button>

          {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-2/3 h-2/3 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-black">Plan a Ride</h3>
            <ul className="space-y-4">
            <p className="text-black">
            <input
              type="checkbox"
              id="checkbox3"
              name="option3"
              checked={checkbox3Checked} // Controlled checkbox
              onChange={() => handleCheckboxChange(3)} // Handle change for checkbox 1
            />
            Looking for a Ride
              </p>
              <p className="text-black">
            <input
              type="checkbox"
              id="checkbox4"
              name="option4"
              checked={checkbox4Checked} // Controlled checkbox
              onChange={() => handleCheckboxChange(4)} // Handle change for checkbox 1
            />
            Looking for Riders
              </p>
              <p className="text-black">
              <label>Destination (address, city, state, zip code):</label>
            <input
            type="text"
            id="destination"
            value={destination}
            onChange={handleDestinationInput}
            className="border border-gray-300 rounded p-2 w-96"
            />
              </p>
              <p className="text-black">
              <input 
              type="checkbox"
              id="checkbox5"
              name="option5"
              checked = {checkbox5Checked}
              onChange={() => handleCheckboxChange(5)}
              />
              Have room for luggage
            </p>
            <p className="text-black">
              <input 
              type="checkbox"
              id="checkbox6"
              name="option6"
              checked = {checkbox6Checked}
              onChange={() => handleCheckboxChange(6)}
              />
              Need room for luggage
            </p>
            <p className="text-black">
                  <input type="checkbox" id="checkbox7" name="option7" value="value7" checked = {checkbox7Checked} onChange={() => handleCheckboxChange(7)}/>
                    Want to Ride Silent
          </p>
          <p className="text-black">
            <label htmlFor="slider2">Number of Seats Open/Needed: {sliderValue2}</label>
            <input
              type="range"
              id="slider2"
              name="volume"
              min="0"
              max="9"
              value={sliderValue2} // Controlled component
              onChange={handleSliderChange2} // Update on change
              className="ml-2"
            />
          </p> 
          <p className="text-black">
            <label>Pickup/Departure Time:</label>
            <input
            type="time"
            id="pickupTime"
            value={time2}
            onChange={handleTimeInput2}
            className="border border-gray-300 rounded p-2 w-46"
            />
            </p>
              </ul>
              <div className="flex justify-between">
              <button
              className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={toggleModal} >
              Close
            </button>
            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={makePost} >
              Post
            </button>
            </div>
          </div>
        </div>
      )}
      
        </div>
      </header>

      {/* Sidebar on the Left */}
      <aside className="bg-gray-300 p-6">
        <ul className="space-y-4">
          <li className="text-lg text-black">Filters</li>
          <p className="text-black">
            <input
              type="checkbox"
              id="checkbox1"
              name="option1"
              checked={checkbox1Checked} // Controlled checkbox
              onChange={() => handleCheckboxChange(1)} // Handle change for checkbox 1
            />
            Looking for a Ride
          </p>
          <p className="text-black">
            <input
              type="checkbox"
              id="checkbox2"
              name="option2"
              checked={checkbox2Checked} // Controlled checkbox
              onChange={() => handleCheckboxChange(2)} // Handle change for checkbox 2
            />
            Looking for Riders
          </p>
          <p className="text-black">
            <label htmlFor="slider1">Number of Seats Open/Needed: {sliderValue1}</label>
            <input
              type="range"
              id="slider1"
              name="volume"
              min="0"
              max="9"
              value={sliderValue1} // Controlled component
              onChange={handleSliderChange1} // Update on change
              className="ml-2"
            />
          </p>  
          <p className="text-black">
                  <input type="checkbox" id="checkbox3" name="option3" value="value3"
                  checked={needLuggage} onChange={() => handleCheckboxChange(8)}/>
                    Need Luggage Space
          </p>
          <p className="text-black">
                  <input type="checkbox" id="checkbox4" name="option4" value="value4"
                  checked={silentRide} onChange={() => handleCheckboxChange(9)}/>
                    Want to Ride Silent
          </p>
          <p className="text-black">
            <label>Pickup Time:</label>
            <input
            type="time"
            id="pickupTime"
            value={time}
            onChange={handleTimeInput}
            className="border border-gray-300 rounded p-2 w-32"
            />
            </p>
        </ul>
      </aside>


       {/* Main Content */}
       <main className="p-6">
        <h2 className="text-xl font-semibold text-black">Current Available Rides</h2>
        <div className="space-y-4 text-black">
    {filteredRides.length === 0 && <p>No rides available based on your filters.</p>}
    {filteredRides.map((ride, index) => (
      <div key={index} className="border border-gray-300 p-4 rounded-lg bg-white text-black">
        <h3 className="text-lg font-bold">Ride to {ride.destination}</h3>

        {ride.isLookingForRiders ? (
          <p>Looking for Riders.<br />
             Destination: {ride.destination} <br />
             {ride.sliderValue2} open seat(s) <br />
             {ride.checkbox5Checked ? "Have" : "Don't have"} room for luggage <br />
             {ride.checkbox7Checked ? "Want a " : "Doesn't care about a "} silent car ride <br />
             Departing at: {ride.time2}
             </p>
        ) : (
          <p>Looking for a Ride.<br />
             Destination: {ride.destination} <br />
             {ride.sliderValue2} seat(s) needed <br />
             {ride.checkbox6Checked ? "Need" : "Don't need"} room for luggage <br />
             {ride.checkbox7Checked ? "Want a " : "Doesn't care about a "} silent car ride <br />
             Want to leave at: {ride.time2}</p>
        )}
      </div>
    ))}
  </div>
      </main>
    </div>
  );
}
