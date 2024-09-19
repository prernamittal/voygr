import React, { useState } from 'react';
import PreferenceForm from '../components/PreferenceForm';
import PlaceCard from '../components/PlaceCard';

const Itinerary = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);

  const handlePreferencesUpdate = (preferences) => {
    setRecommendations(preferences.recommendations);
    setUserPreferences(preferences.userPreferences);
  };

  return (
    <div className="container pt-4 pb-4">
      <h1 className="text-center text-light mb-4">Generate Your Itinerary</h1>
      <PreferenceForm setRecommendations={handlePreferencesUpdate} />

      <div className="mt-4">
        {recommendations.length === 0 ? (
          <p className="text-light">No recommendations available. Please fill out the form to get suggestions.</p>
        ) : (
          recommendations.slice(0, 5).map((place) => (
            <PlaceCard
              key={place._id}
              place={place}
              userStartDate={userPreferences.startDate}
              userEndDate={userPreferences.endDate}
              userPreferences={userPreferences}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Itinerary;
