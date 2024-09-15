import React, { useState } from 'react';
import axios from 'axios';

const PreferenceForm = ({ setRecommendations }) => {
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [activities, setActivities] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!budget || isNaN(parseInt(budget))) {
      console.error('Please provide a valid budget');
      return;
    }
    if (!interests) {
      console.error('Please provide interests');
      return;
    }
    if (!startDate || !endDate) {
      console.error('Please provide both start and end dates');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/itinerary/generate', {
        budget: parseInt(budget),
        interests: interests.split(',').map(item => item.trim()),  // Convert comma-separated values to an array
        activities: activities.split(',').map(item => item.trim()),  // Same for activities
        startDate,
        endDate,
      });
      setRecommendations(response.data);  // Update parent state with recommendations
    } catch (error) {
      console.error("Error generating itinerary", error);
      if (error.response && error.response.data) {
        console.error('Backend error:', error.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label>Budget:</label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />

      <label>Interests (comma-separated):</label>
      <input
        type="text"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        required
      />

      <label>Activities (comma-separated):</label>
      <input
        type="text"
        value={activities}
        onChange={(e) => setActivities(e.target.value)}
      />

      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />

      <button type="submit">Get Recommendations</button>
    </form>
  );
};

// Simple CSS styling for the form
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default PreferenceForm;
