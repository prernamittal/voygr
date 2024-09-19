import React from 'react';
import axios from 'axios';

const DownloadPDFButton = ({ preferences }) => {
    const handleDownload = async () => {
        try {
            if (!preferences || !preferences.places || !preferences.userPreferences) {
                throw new Error('Invalid preferences data');
            }
            
            const response = await axios.post(
                'https://travel-backend-dtty.onrender.com/api/generate-pdf',
                preferences,
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',  
                    },
                }
            );
            
      // Create a URL for the PDF blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'itinerary.pdf'); // File name

      // Append link to the body and trigger click to start download
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading PDF:', error.message);
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <button 
        onClick={handleDownload} 
        className="btn btn-dark" 
        style={{ color: 'white' }}
    >
        Download Itinerary as PDF
    </button>
);
};

export default DownloadPDFButton;
