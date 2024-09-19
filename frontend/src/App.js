import React from 'react';
import Itinerary from './pages/Itinerary';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App bg-dark">
      <Itinerary />
      <Footer />
    </div>
  );
}

export default App;
