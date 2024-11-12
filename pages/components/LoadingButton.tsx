import React, { useState } from 'react';

function LoadingButton({ onClick, children }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Your asynchronous operation here (e.g., fetching data)
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
    setIsLoading(false);
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default LoadingButton;