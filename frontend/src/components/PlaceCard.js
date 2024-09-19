import React, { useState } from 'react';
import DownloadPDFButton from './GeneratePDF';

const PlaceCard = ({ place, userStartDate, userEndDate, userPreferences }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to get suitable hotels based on backend logic
  const getSuitableHotel = () => {
    if (!place.hotels || place.hotels.length === 0) return null;
    return place.recommendedHotel; // Assuming backend logic sends the recommended hotel
  };

  // Constructing the preferences object to pass to DownloadPDFButton
  const preferences = {
    places: [place],  // Assuming place is a single place; wrap it in an array
    userPreferences: {
      budget: userPreferences.budget,  // Use the dynamic budget
      interests: userPreferences.interests,  // Use the dynamic interests
      activities: place.activities,
      startDate: userStartDate,
      endDate: userEndDate,
    }
  };

  // Rendering the relevant place information and hotel details
  return (
    <div className="card mb-4" style={{ backgroundColor: '#B2FBA5', borderRadius: '10px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="card-title">{place.location.city}, {place.location.country}</h2>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="btn btn-dark"
          >
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3">
            <p><strong>Description:</strong> {place.description}</p>
            <p><strong>Average Cost:</strong> ${place.averageCost}</p>
            <p><strong>Activities:</strong> {place.activities.join(', ')}</p>

            <p><strong>Trip Duration:</strong> {userStartDate} to {userEndDate}</p>

            <h4>Recommended Hotel:</h4>
            {getSuitableHotel() ? (
              <div>
                <p><strong>Hotel Name:</strong> {getSuitableHotel().name}</p>
                <p><strong>Cost Per Night:</strong> ${getSuitableHotel().costPerNight}</p>
                <p><strong>Rating:</strong> {getSuitableHotel().rating} stars</p>
              </div>
            ) : (
              <p>No suitable hotels found.</p>
            )}
            <DownloadPDFButton preferences={preferences} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
