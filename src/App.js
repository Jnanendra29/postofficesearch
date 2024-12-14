import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import FavouritePage from './components/FavouritePage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/favourites" element={<FavouritePage />} />
    </Routes>
  </Router>
);

export default App;
