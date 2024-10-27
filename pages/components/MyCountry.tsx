/*
import React from 'react';
import { useRouter } from 'next/router';

const MyCountry: React.FC = () => {
  const router = useRouter();
  const { city } = router.query;

  return (
    <div>
      <h1>Welcome to My Country Page!</h1>
      <p>Your city is: {city}</p>
    </div>
  );
};

export default MyCountry;
*/
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import App from './App';

const MyHome: React.FC = () => {
  return <App />;
};


const apiKeyUnsplash = 'De_KjgAf6qDr_Fpb6PUCvsv5uLpP0MmONRvogEpI1BY'; // Unsplash API Key

const MyCountry: React.FC = () => {
  const router = useRouter();
  const { city, name } = router.query;

  const [currentCity, setCurrentCity] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    };
    fetchAllUsers();
  }, []);

  const selectCapital = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setCurrentCity(selectedCity);
    if (selectedCity) {
      await getUnsplashImages(selectedCity);
    } else {
      setImageResults([]);
      setSelectedImage('');
    }
  };

  const getUnsplashImages = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyUnsplash}`);
      if (response.data.results.length > 0) {
        setImageResults(response.data.results);
      } else {
        setError(`No images found for ${city}.`);
        setImageResults([]);
      }
    } catch (error) {
      setError('Error fetching Unsplash images.');
    } finally {
      setLoading(false);
    }
  };

  const selectImage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    if (selectedIndex) {
      setSelectedImage(imageResults[selectedIndex].urls.regular);
    } else {
      setSelectedImage('');
    }
  };

  return (
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>World Capitals</title>
        <link rel="icon" href="icon.png" type="image/png" />
      </head>
      <body>
        <App />
        <div className="container">
          <h2>Welcome, {name}!</h2>
	  <h2>Your city is: {city}!</h2>
          <h3>Capitals & Images</h3>
          <h3>World Capitals</h3>
          <div className="capital-selector">
            <select id="capitals-menu" onChange={selectCapital}>
              <option value="">Select a capital</option>
              <option value="Kyiv">Kyiv</option>
              <option value="London">London</option>
              <option value="Berlin">Berlin</option>
              <option value="Paris">Paris</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Washington, D.C.">Washington, D.C.</option>
              <option value="Ottawa">Ottawa</option>
              <option value="Dnipro">Dnipro</option>
            </select>
          </div>
          <div id="images-menu-container" style={{ display: imageResults.length > 0 ? 'block' : 'none' }}>
            <label htmlFor="images-menu">Select an image:</label>
            <select id="images-menu" onChange={selectImage}>
              <option value="">Select an image</option>
              {imageResults.map((image, index) => (
                <option key={index} value={index}>
                  {image.alt_description || `Image ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
          <div className="picture-title">
            {selectedImage && <img id="background-image" src={selectedImage} alt="Background" style={{ display: 'block', borderRadius: '10px', marginTop: '20px' }} />}
            <p id="description"></p>
          </div>
          <div id="error-message" className="error-message">{error}</div>
          {loading && <p id="loading">Loading...</p>}
        </div>
        <div className="description">
          <p>This demo illustrates how we can make multiple fetches on one page. We first fetch a list of capitals, followed by images for each. We then populate listings, such that each capital is connected to an individual fetch for images, which in turn are shown as a background. Images are from <a href="https://unsplash.com/developers">Unsplash</a>.</p>
        </div>
      </body>
    </div>
  );
};

export default MyCountry;
