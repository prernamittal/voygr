import React, { useState } from 'react';
import PreferenceForm from '../components/PreferenceForm';
import PlaceCard from '../components/PlaceCard';

const Itinerary = () => {
  const [recommendations, setRecommendations] = useState([]);  // Store recommendations

  return (
    <div>
      <h1>Generate Your Itinerary</h1>
      <PreferenceForm setRecommendations={setRecommendations} />
      <div>
        {recommendations.slice(0, 5).map((place) => (
          <PlaceCard key={place._id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
