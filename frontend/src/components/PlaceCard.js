import React, { useState } from 'react';

const PlaceCard = ({ place }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2>{place.name}</h2>
        <h3>{place.location.city}, {place.location.country}</h3>
        <button onClick={() => setIsExpanded(!isExpanded)} style={styles.button}>
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {isExpanded && (
        <div style={styles.description}>
          <p>{place.description}</p>
          <p>Activities: {place.activities.join(', ')}</p>
          <p>Best Time to Visit: {place.preferredMonths.join(', ')}</p>
          <p>Average Cost: {place.averageCost}</p>
        </div>
      )}
    </div>
  );
};

// Styling for the card
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  description: {
    marginTop: '10px',
  },
};

export default PlaceCard;
