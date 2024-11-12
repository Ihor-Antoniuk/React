import React, { useState } from 'react';

function App() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const generateImage = async () => {
        setIsLoading(true);
        setErrorMessage(null); // Clear previous error message

        try {
            const response = await fetch('http://localhost:3002/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                //throw new Error(`HTTP error! Status: ${response.status}`);
                setErrorMessage(`No image found: Code is ${response.status}`);
            }
            else {
                const data = await response.json();
                if (data.success && data.images && data.images.length > 0) {
                    //setImageUrl(`data:image/png;base64,${data.images[0]}`);
                    setImageUrl(data.images[0]);
                } else {
                    setErrorMessage('No image found in response.');
                }
            }
        } catch (error) {
            console.error('Error generating image:', error);
            setErrorMessage('An error occurred while generating the image.'); // Generic error message for user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>AI Image Generator</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
            />
            <button
                className={isLoading ? 'loading' : ''}
                disabled={isLoading}
                onClick={generateImage}>
                {isLoading ? 'Loading...' : 'Generate Image'}
            </button>
            {imageUrl && <img src={imageUrl} alt="Generated" />}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!isLoading && !imageUrl && <h2>No photo about your thoughts yet...</h2>}
        </div>
    );
}

export default App;