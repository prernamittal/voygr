import React, { useState } from 'react';
import axios from 'axios';

const PreferenceForm = ({ setRecommendations }) => {
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [activities, setActivities] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Add error message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!budget || isNaN(parseInt(budget))) {
      console.error('Please provide a valid budget');
      setErrorMessage('Please provide a valid budget');
      return;
    }
    if (!interests) {
      console.error('Please provide interests');
      setErrorMessage('Please provide your interests');
      return;
    }
    if (!startDate || !endDate) {
      console.error('Please provide both start and end dates');
      setErrorMessage('Please provide both start and end dates');
      return;
    }

    // Split and trim interests, handle empty activities
    const interestsArray = interests.split(',').map(item => item.trim());
    const activitiesArray = activities
      ? activities.split(',').map(item => item.trim()).filter(activity => activity !== "")
      : [];  // Convert empty activities field into an empty array

    try {
      const response = await axios.post('http://localhost:5000/api/itinerary/generate', {
        budget: parseInt(budget),
        interests: interestsArray,  // Convert comma-separated values to an array
        activities: activitiesArray,  // Ensure empty activities field is handled correctly
        startDate,
        endDate,
      });
      
      setRecommendations({
        recommendations: response.data,  // Update parent state with recommendations
        userPreferences: {
          budget: parseInt(budget),
          interests: interestsArray,
          activities: activitiesArray,
          startDate,
          endDate,
        }
      });
      setErrorMessage('');  // Clear error message if request is successful
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Backend returned 404, no places found
        setErrorMessage('No places found matching your preferences.');
      } else {
        setErrorMessage('An error occurred while fetching recommendations.');
      }
      console.error("Error generating itinerary", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 bg-dark text-light rounded shadow-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="budget" className="form-label">Budget:</label>
          <input
            id="budget"
            type="number"
            className="form-control"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="interests" className="form-label">Interests (comma-separated):</label>
          <input
            id="interests"
            type="text"
            className="form-control"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="activities" className="form-label">Activities (comma-separated):</label>
          <input
            id="activities"
            type="text"
            className="form-control"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input
            id="startDate"
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input
            id="endDate"
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn" style={{ backgroundColor: '#B2FBA5', color: '#000' }}>
          Get Recommendations
        </button>
      </form>

      {/* Display error message if there is one */}
      {errorMessage && (
        <div className="alert alert-warning mt-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default PreferenceForm;
