import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreferenceForm = ({ setRecommendations }) => {
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInterestsAndActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/places/interests-activities');
        setInterests(response.data.interests);
        setActivities(response.data.activities);
      } catch (error) {
        console.error('Error fetching interests and activities:', error);
      }
    };

    fetchInterestsAndActivities();
  }, []);

  // Toggle interest selection
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Toggle activity selection
  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    try {
      const response = await axios.post('http://localhost:5000/api/itinerary/generate', {
        budget: parseInt(budget),
        interests: selectedInterests,
        activities: selectedActivities,
        startDate,
        endDate,
      });

      setRecommendations({
        recommendations: response.data,
        userPreferences: {
          budget: parseInt(budget),
          interests: selectedInterests,
          activities: selectedActivities,
          startDate,
          endDate,
        },
      });

      setErrorMessage(''); 
    } catch (error) {
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 bg-dark text-light rounded shadow-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="budget" className="form-label">Budget (in $):</label>
          <select
            id="budget"
            className="form-control"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          >
            <option value="">Select Budget</option>
            <option value="500">0 - 500</option>
            <option value="1000">500 - 1000</option>
            <option value="2000">1000 - 2000</option>
            <option value="3000">2000 - 3000</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Interests:</label>
          <div className="d-flex flex-wrap">
            {interests.map((interest) => (
              <span
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`badge badge-pill ${selectedInterests.includes(interest) ? 'bg-success' : 'bg-secondary'} m-1`}
                style={{ cursor: 'pointer' }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Activities:</label>
          <div className="d-flex flex-wrap">
            {activities.map((activity) => (
              <span
                key={activity}
                onClick={() => toggleActivity(activity)}
                className={`badge badge-pill ${selectedActivities.includes(activity) ? 'bg-success' : 'bg-secondary'} m-1`}
                style={{ cursor: 'pointer' }}
              >
                {activity}
              </span>
            ))}
          </div>
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
          <b>Get Recommendations</b>
        </button>
      </form>

      {errorMessage && (
        <div className="alert alert-warning mt-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default PreferenceForm;
